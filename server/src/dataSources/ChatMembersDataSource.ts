import {db} from '../db';
import {chatMembers, InsertChatMember, SelectChatMember} from '../db/schema';

export default class ChatMembersDataSource {
	public async list(): Promise<SelectChatMember[]> {
		return await db.query.chatMembers.findMany();
	}

	public async getById(userId: string): Promise<SelectChatMember | undefined> {
		return db.query.chatMembers.findFirst({
			where: (model, {eq}) => eq(model.user_id, userId),
		});
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

	public async create(
		members: InsertChatMember[]
	): Promise<InsertChatMember[]> {
		return db
			.insert(chatMembers)
			.values(
				members.map((member) => ({
					chat_id: member.chat_id,
					user_id: member.user_id,
					role: member.role,
				}))
			)
			.returning();
	}
}
