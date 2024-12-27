import {db} from '../db';
import {InsertMessage, SelectMessage, messages} from '../db/schema';

export default class MessagesDataSource {
	public async lisByChatId(chatId: number): Promise<SelectMessage[]> {
		return db.query.messages.findMany({
			where: (model, {eq}) => eq(model.chat_id, chatId),
		});
	}

	public async create({
		chat_id,
		content,
		sender_id,
	}: Omit<InsertMessage, 'id'>): Promise<SelectMessage> {
		const result = await db
			.insert(messages)
			.values({chat_id, content, sender_id});
		throw new Error('Not implemented');
	}
}
