import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {ChatMembersDataSource, ChatsDataSource} from '../dataSources';

const chatsDataSource = new ChatsDataSource();
const chatMembersDataSource = new ChatMembersDataSource();

const chatMemberValidation = z
	.object({
		chatId: z.string().refine(
			(val) => {
				const parsedValue = parseInt(val);
				return !!isNaN(parsedValue) && parsedValue <= 0;
			},
			{message: 'chatId must be a positive integer'}
		),
	})
	.transform(({chatId}) => ({
		chatId: parseInt(chatId),
	}));

export async function getChatMembers(req: Request, res: Response) {
	const {userId} = req.auth!;
	const chatId = Number(req.params.chatId);

	if (!chatId || isNaN(chatId))
		return res.status(400).send('numeric chatId is required');

	const canReadChat = await chatsDataSource.canUserReadChat(userId, chatId);
	if (!canReadChat)
		return res.status(403).send('user cannot read chat or it does not exist');

	const chatMembers = await chatMembersDataSource.listByChatId(chatId);

	res.status(200).send(chatMembers);
}

export async function createChatMember(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = req.auth?.userId!;
	const chatMemberData: z.infer<typeof chatMemberValidation> = req.body;
	try {
		chatMemberValidation.parse(chatMemberData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	const chat = await chatsDataSource.findById(chatMemberData.chatId);

	if (!chat) {
		return next(createError(400, 'Chat does not exist'));
	}

	const isAdmin = await chatsDataSource.isUserAdmin(userId, chat.id);
	if (!isAdmin) {
		return next(createError(403, 'User is not admin'));
	}

	const chatMembers = await chatMembersDataSource.listByChatId(
		chatMemberData.chatId
	);

	if (chatMembers.some((member) => member.user_id === userId)) {
		return next(createError(400, 'User is is already in the chat'));
	}

	try {
		const member = await chatMembersDataSource.create([
			{
				chat_id: chatMemberData.chatId,
				user_id: userId,
			},
		]);
		res.status(201).send(member).end();
	} catch (error) {
		next(createError(500, 'Could not create chat member'));
	}
}
