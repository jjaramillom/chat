import UserModel, {User} from '../models/User';

export default class UsersDataSource {
	static getAllUsers() {
		return UserModel.find();
	}

	static createUser(user: User) {
		return UserModel.create(user);
	}
}
