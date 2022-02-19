/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
process.env.LOG_LEVEL = 'silent';

const MongoDbConnection = require('./src/services/MongoDbConnection');

/* eslint-disable no-undef */
jest.mock('./src/middleware', () => ({
	authenticate: {
		authenticate: () => (req, res, next) => {
			req.user = {
				name: 'pepi',
				username: 'pepi123',
				password: 'pepi123'
			};
			next();
		}
	}
}));

MongoDbConnection.connect = jest.fn().mockReturnValue('');
