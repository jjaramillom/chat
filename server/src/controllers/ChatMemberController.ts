import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from 'zod';
import createError from 'http-errors';

import {chatMembers, SelectChatMember, InsertChatMember} from '../db/schema';
import {ChatsDataSource, ChatMembersDataSource} from '../dataSources';

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

export async function getMembers(req: Request, res: Response) {
	const {userId} = req.auth!;

	const chatMembers = await chatMembersDataSource.listByUserId(userId);

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

	const chatMembers = await chatMembersDataSource.listByChatId(
		chatMemberData.chatId
	);

	if (chatMembers.some((member) => member.user_id === userId)) {
		return next(createError(400, 'User is is already in the chat'));
	}

	try {
		const member = await chatMembersDataSource.create({
			chat_id: chatMemberData.chatId,
			user_id: userId,
		});
		res.status(200).send(member).end();
	} catch (error) {
		next(createError(500, 'Could not create chat member'));
	}
}
