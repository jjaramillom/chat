import {db} from '../db';
import {SelectUser, users} from '../db/schema';

export default class UsersDataSource {
	public async list(): Promise<SelectUser[]> {
		return db.query.users.findMany();
	}

	public async findById(id: string): Promise<SelectUser | undefined> {
		return db.query.users.findFirst({where: (model, {eq}) => eq(model.id, id)});
	}

	public async getUsername(id: string): Promise<string> {
		const user = await this.findById(id);
		if (!user) throw new Error('User not found');
		return user.username;
	}
}
