import UserModel, {User} from '../models/User';

export default class UsersDataSource {
	static getAllUsers() {
		return UserModel.find();
	}

	static getUserByUsername(username: string) {
		return UserModel.findOne({username});
	}

	static getUserById(id: string) {
		return UserModel.findById(id);
	}

	static createUser(user: User) {
		return UserModel.create(user);
	}
}
