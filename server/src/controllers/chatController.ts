import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {ChatsDataSource} from '../dataSources';
import {InsertChat} from '../db/schema';

const chatsDataSource = new ChatsDataSource();

const chatValidation = z.object({
	name: z.string().nullable().optional(),
	type: z.enum(['private', 'public_group', 'private_group']),
}) satisfies z.ZodType<Omit<InsertChat, 'id'>>;

export async function getChats(req: Request, res: Response) {
	const {userId} = req.auth!;

	const chats = await chatsDataSource.listUserChats(userId);

	res.status(200).send(chats);
}

export async function createChat(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const chatData = req.body;
	try {
		chatValidation.parse(chatData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	try {
		const room = await chatsDataSource.create(chatData);
		res.status(200).send(room).end();
	} catch (error) {
		next(createError(500, 'could not create chat'));
	}
}
