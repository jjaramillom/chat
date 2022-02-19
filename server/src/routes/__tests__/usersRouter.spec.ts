import supertest from 'supertest';

import server from '../../server';
import {UserDocument} from './../../models/User';
import {UsersDataSource} from '../../dataSources';

const MOCKED_USERS = [
	{name: 'pete', username: 'peteTall', password: '', _id: '1'},
	{name: 'sam', username: 'sam321', password: 'myPass', _id: '2'},
	{name: 'edu', username: 'edu123', password: 'yourPass', _id: '3'}
];

jest.mock('../../dataSources', () => ({
	UsersDataSource: {
		getAllUsers: jest.fn()
	}
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserQueryResult = UserDocument & {_id: any};
const UsersDataSourceMock = UsersDataSource as jest.Mocked<typeof UsersDataSource>;
UsersDataSourceMock.getAllUsers.mockReturnValue(
	new Promise((resolve) => {
		resolve(MOCKED_USERS as UserQueryResult[]);
	})
);

const requestWithSuperTest = supertest(server);

describe('users endpoint', () => {
	it('should return the existing users', async () => {
		const res = await requestWithSuperTest.get('/api/user');

		expect(res.status).toEqual(200);
		expect(res.body).toEqual(MOCKED_USERS);
	});
});
