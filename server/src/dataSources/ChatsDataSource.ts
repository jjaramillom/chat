import {and, eq, or} from 'drizzle-orm';

import {db} from '../db';
import {chatMembers, chats, InsertChat, SelectChat} from '../db/schema';

export default class ChatsDataSource {
	public async list(): Promise<SelectChat[]> {
		return db.query.chats.findMany();
	}

	public async listByType(type: SelectChat['type']): Promise<SelectChat[]> {
		return db.query.chats.findMany({
			where: (model, {eq}) => eq(model.type, type),
		});
	}

	public async listUserChats(userId: string): Promise<SelectChat[]> {
		const userChats = await db
			.select({
				chatId: chats.id,
				chatType: chats.type,
				chatName: chats.name,
				userRole: chatMembers.role,
			})
			.from(chatMembers)
			.leftJoin(chats, eq(chats.id, chatMembers.chat_id))
			.where(eq(chatMembers.user_id, userId));

		return userChats.map((chat) => ({
			id: chat.chatId!,
			type: chat.chatType!,
			name: chat.chatName,
		}));
	}

	public async create({
		type,
		name,
	}: Omit<InsertChat, 'id'>): Promise<SelectChat> {
		const result = await db.insert(chats).values({type, name}).returning();
		return result[0];
	}

	public async findById(id: number): Promise<SelectChat | undefined> {
		return db.query.chats.findFirst({where: (model, {eq}) => eq(model.id, id)});
	}

	public async isUserAdmin(
		userId: string,
		chatId: number
	): Promise<boolean> {
		const userChats = await db
			.select({
				chatId: chats.id,
				chatType: chats.type,
			})
			.from(chatMembers)
			.leftJoin(chats, eq(chats.id, chatMembers.chat_id))
			.where(
				and(eq(chatMembers.user_id, userId), eq(chatMembers.role, 'admin'))
			);

		return userChats.some((chat) => chat.chatId === chatId);
	}

	public async canUserAccessChat(
		userId: string,
		chatId: number
	): Promise<boolean> {
		const userChats = await db
			.select({
				chatId: chats.id,
				chatType: chats.type,
			})
			.from(chatMembers)
			.leftJoin(chats, eq(chats.id, chatMembers.chat_id))
			.where(
				or(eq(chatMembers.user_id, userId), eq(chats.type, 'public_group'))
			);

		return userChats.some((chat) => chat.chatId === chatId);
	}
}
