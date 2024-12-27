import {db} from '../db';
import {chatMembers, SelectChatMember, InsertChatMember} from '../db/schema';

export default class ChatMembersDataSource {
	public async list(): Promise<SelectChatMember[]> {
		return await db.query.chatMembers.findMany();
	}

	public async listByChatId(chatId: number): Promise<SelectChatMember[]> {
		return db.query.chatMembers.findMany({
			where: (model, {eq}) => eq(model.chat_id, chatId),
		});
	}

	public async listByUserId(userId: string): Promise<SelectChatMember[]> {
		return db.query.chatMembers.findMany({
			where: (model, {eq}) => eq(model.user_id, userId),
		});
	}

	public async create({
		chat_id,
		user_id,
		role,
	}: InsertChatMember): Promise<InsertChatMember> {
		const result = await db
			.insert(chatMembers)
			.values({chat_id, user_id, role});
			throw new Error('Not implemented');
		}
}
