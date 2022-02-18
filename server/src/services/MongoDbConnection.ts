import mongoose from 'mongoose';

import {env} from '../utils/env';

export default class MongoDbConnection {
	private static dbConnection: typeof mongoose;

	public static async connect() {
		if (MongoDbConnection.dbConnection?.connection) {
			return;
		}
		const dbUri = `mongodb://${env('MONGO_DB_URL')}/${env('MONGO_DB_NAME')}`;

		mongoose.connection.once('open', () => {
			console.log('connected to MongoDB');
		});

		mongoose.connection.once('error', () => {
			console.error('could not connect to mongoDB');
		});

		MongoDbConnection.dbConnection = await mongoose.connect(dbUri);
	}
}
