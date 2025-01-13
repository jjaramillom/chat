import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {ChatsDataSource, MessagesDataSource} from '../dataSources';
import {InsertMessage} from '../db/schema';
import {messages} from './../db/schema';

const messagesDataSource = new MessagesDataSource();
const chatsDataSource = new ChatsDataSource();

const messageSchema = z.object({
	content: z.string(),
	chat_id: z.number(),
}) satisfies z.ZodType<Omit<InsertMessage, 'id' | 'sender_id'>>;

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

	const canReadChat = await chatsDataSource.canUserReadChat(userId, chatId);
	if (!canReadChat)
		return res.status(403).send('user cannot read chat or it does not exist');

	const chats = await messagesDataSource.lisByChatId(
		chatId,
		castedOffset,
		castedLimit
	);

	res.status(200).send(chats);
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

	const canReadChat = await chatsDataSource.canUserReadChat(userId, chatId);
	if (!canReadChat)
		return res.status(403).send('user cannot access chat or it does not exist');

	const message = await messagesDataSource.create({
		chat_id: chatId,
		content: messageData.content,
		sender_id: userId,
	});

	res.status(201).send(message).end();
}
