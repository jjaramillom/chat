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

type UsersDataSourceType = InstanceType<typeof UsersDataSource>;

const usersDataSourceMock = UsersDataSource as unknown as jest.Mocked<UsersDataSourceType>;
usersDataSourceMock.list.mockReturnValue(
	new Promise((resolve) => {
		resolve(MOCKED_USERS as UserDocument[]);
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
