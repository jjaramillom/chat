import {count, desc, eq} from 'drizzle-orm';

import {db} from '../db';
import {InsertMessage, messages, users} from '../db/schema';
import {Paginated, SortingOrder} from './types';

export interface Message {
	id: number;
	content: string;
	timestamp: Date;
	chatId: number;
	senderId: string;
}

export interface MessageWithUsername extends Message {
	senderUsername: string;
}

export default class MessagesDataSource {
	public async listByChatId(
		chatId: number,
		offset: number,
		limit: number,
	): Promise<Paginated<MessageWithUsername>> {
		const data = await db
			.select({
				id: messages.id,
				content: messages.content,
				timestamp: messages.timestamp,
				userId: users.id,
				senderUsername: users.username,
				senderId: users.id,
				chatId: messages.chat_id,
			})
			.from(messages)
			.innerJoin(users, eq(users.id, messages.sender_id))
			.where(eq(messages.chat_id, chatId))
			.orderBy(desc(messages.timestamp))
			.offset(offset)
			.limit(limit);

		const total = await db
			.select({count: count()})
			.from(messages)
			.where(eq(messages.chat_id, chatId));

		return {
			data,
			total: total[0].count,
		};
	}

	public async create({
		chat_id,
		content,
		sender_id,
	}: Omit<InsertMessage, 'id'>): Promise<MessageWithUsername> {
		const result = await db
			.insert(messages)
			.values({chat_id, content, sender_id})
			.returning({
				id: messages.id,
				chatId: messages.id,
				content: messages.content,
				timestamp: messages.timestamp,
				senderId: messages.sender_id,
			});
		const user = (await db.query.users.findFirst({
			where: (model, {eq}) => eq(model.id, sender_id),
		}))!;
		return {...result[0], senderUsername: user.username};
	}
}
