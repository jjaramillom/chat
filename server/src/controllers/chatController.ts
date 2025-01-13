import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {ChatMembersDataSource, ChatsDataSource} from '../dataSources';
import {InsertChat, InsertChatMember} from '../db/schema';

const chatsDataSource = new ChatsDataSource();
const chatMembersDataSource = new ChatMembersDataSource();

const chatSchema = z.object({
	name: z.string().nullable().optional(),
	type: z.enum(['private', 'public_group', 'private_group']),
	membersIds: z.array(z.string()).optional(),
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
	let chatData = req.body as z.infer<typeof chatSchema>;
	const {userId} = req.auth!;
	try {
		chatData = chatSchema.parse(chatData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	try {
		const chat = await chatsDataSource.create({
			type: chatData.type,
			name: chatData.name,
		});

		const members: InsertChatMember[] = [
			{chat_id: chat.id, user_id: userId, role: 'member'},
		];

		if (chatData.membersIds) {
			members.push(
				...chatData.membersIds.map(
					(id): InsertChatMember => ({
						chat_id: chat.id,
						user_id: id,
						role: 'member',
					})
				)
			);
		}

		chatMembersDataSource.create(members);

		res.status(200).send(chat).end();
	} catch (error) {
		next(createError(500, 'could not create chat'));
	}
}
