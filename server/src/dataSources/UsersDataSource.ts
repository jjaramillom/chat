import UserModel, {User} from '../models/User';

export default class UsersDataSource {
	static async getAllUsers() {
		const result = await UserModel.find();
		return result;
	}

	static async getUserByUsername(username: string) {
		const result = await UserModel.findOne({username});
		return result;
	}

	static async getUserById(id: string) {
		const result = await UserModel.findById(id);
		return result;
	}

	static async createUser(user: User) {
		const result = await UserModel.create(user);
		return result;
	}
}
