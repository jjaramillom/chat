import UserModel, {UserDocument} from '../models/User';

export default class UsersDataSource {
	public async list(): Promise<UserDocument[]> {
		const result = await UserModel.find();

		return result.map(addId);
	}

	public async getByUsername(username: string): Promise<UserDocument | null> {
		const result = await UserModel.findOne({username});
		return result ? addId(result) : null;
	}

	public async getById(id: string): Promise<UserDocument | null> {
		const result = await UserModel.findById(id);
		return result ? addId(result) : null;
	}

	public async create(user: UserDocument): Promise<UserDocument | null> {
		const result = await UserModel.create(user);
		return addId(result);
	}
}

function addId(user: UserDocument): UserDocument {
	user.id = user._id;
	return user;
}
