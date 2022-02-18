import {Schema, model, Document, Model} from 'mongoose';
import {hash, genSalt, compare} from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export interface User {
	name: string;
	username: string;
	password: string;
	avatar?: string;
}
interface UserMethods {
	isPasswordValid: (this: User, receivedPassword: string) => Promise<boolean>;
}

interface UserDocument extends User, Document, UserMethods {}

const schema = new Schema<UserDocument, Model<User>, UserMethods>({
	name: {type: String, required: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	avatar: String
});

schema.pre('save', async function (this: User & Document, next) {
	if (!this.isModified('password')) {
		return next();
	}

	genSalt(SALT_WORK_FACTOR, (error, salt) => {
		if (error) {
			return next(error);
		}

		hash(this.password, salt, (error, hash) => {
			if (error) {
				return next(error);
			}

			this.password = hash;
			next();
		});
	});
});

schema.methods.isPasswordValid = async function (receivedPassword) {
	return new Promise((resolve, reject) => {
		compare(receivedPassword, this.password, (error, isMatch) => {
			if (error) {
				return reject(error);
			}
			resolve(isMatch);
		});
	});
};

const UserModel = model<UserDocument>('User', schema);

export default UserModel;
