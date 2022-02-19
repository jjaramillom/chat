import mongoose from 'mongoose';

import {env, logger} from '../utils';

export default class MongoDbConnection {
	private static dbConnection: typeof mongoose;

	public static async connect() {
		if (MongoDbConnection.dbConnection?.connection) {
			return;
		}
		const dbUri = `mongodb://${env('MONGO_DB_URL')}/${env('MONGO_DB_NAME')}`;

		mongoose.connection.once('open', () => {
			logger.info(`connected to MongoDB in mongodb://${env('MONGO_DB_URL')}`);
		});

		mongoose.connection.once('error', () => {
			logger.error('could not connect to mongoDB');
		});

		MongoDbConnection.dbConnection = await mongoose.connect(dbUri);
	}
}
