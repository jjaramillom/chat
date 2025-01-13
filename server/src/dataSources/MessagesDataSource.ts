import {desc, eq} from 'drizzle-orm';

import {db} from '../db';
import {InsertMessage, messages, SelectMessage, users} from '../db/schema';

export default class MessagesDataSource {
	public async lisByChatId(
		chatId: number,
		offset: number,
		limit: number
	): Promise<
		(Omit<SelectMessage, 'sender_id' | 'chat_id'> & {
			senderUsername: string;
			senderId: string;
		})[]
	> {
		return db
			.select({
				id: messages.id,
				content: messages.content,
				timestamp: messages.timestamp,
				userId: users.id,
				senderUsername: users.username,
				senderId: users.id,
			})
			.from(messages)
			.innerJoin(users, eq(users.id, messages.sender_id))
			.where(eq(messages.chat_id, chatId))
			.orderBy(desc(messages.timestamp))
			.offset(offset)
			.limit(limit);
	}

	public async create({
		chat_id,
		content,
		sender_id,
	}: Omit<InsertMessage, 'id'>): Promise<SelectMessage> {
		const result = await db
			.insert(messages)
			.values({chat_id, content, sender_id})
			.returning();
		return result[0];
	}
}
