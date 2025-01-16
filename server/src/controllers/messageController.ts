import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {
	ChatsDataSource,
	MessagesDataSource,
	UsersDataSource,
} from '../dataSources';
import {MessageWithUsername} from '../dataSources/MessagesDataSource';
import {Paginated} from '../dataSources/types';
import {InsertMessage} from '../db/schema';
import {io} from '../subscriptions/socket';

const messagesDataSource = new MessagesDataSource();
const chatsDataSource = new ChatsDataSource();
const usersDataSource = new UsersDataSource();

const newMessageSchema = z.object({
	content: z.string(),
}) satisfies z.ZodType<Pick<InsertMessage, 'content'>>;

export async function getMessages(req: Request, res: Response) {
	const {userId} = req.auth!;
	const chatId = Number(req.params.chatId);
	const {offset, limit} = req.query;

	const castedLimit = Number(limit);
	const castedOffset = Number(offset);

	if (isNaN(castedOffset) || isNaN(castedLimit))
		return res.status(400).send('offset and limit must be numeric');

	if (castedLimit > 100)
		return res.status(400).send('limit must be less than 100');

	if (!chatId || isNaN(chatId))
		return res.status(400).send('numeric chatId is required');

	const canReadChat = await chatsDataSource.canUserAccessChat(userId, chatId);
	if (!canReadChat)
		return res.status(403).send('user cannot read chat or it does not exist');

	const {data, total}: Paginated<MessageWithUsername> =
		await messagesDataSource.listByChatId(chatId, castedOffset, castedLimit);

	res.status(200).json({total, data: data});
}

export async function createMessage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const {userId} = req.auth!;
	let messageData = req.body as z.infer<typeof newMessageSchema>;
	const chatId = Number(req.params.chatId);
	try {
		messageData = newMessageSchema.parse(messageData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	if (!chatId || isNaN(chatId))
		return res.status(400).send('numeric chatId is required');

	const canAccessChat = await chatsDataSource.canUserAccessChat(userId, chatId);
	if (!canAccessChat)
		return res.status(403).send('user cannot access chat or it does not exist');

	const message = await messagesDataSource.create({
		chat_id: chatId,
		content: messageData.content,
		sender_id: userId,
	});
	const senderUsername = await usersDataSource
		.getUsername(userId)
		.catch(() => 'unknown-user');

	const data: MessageWithUsername = {
		...message,
		senderUsername,
	};

	io.emit(`chat_${chatId}`, data);

	res.status(201).end();
}
