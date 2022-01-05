import {Router} from 'express';

import UsersDataSource from '../dataSources/UsersDataSource';

const users = Router();

users
	.route('/')
	.get(async (_, res) => {
		const users = await UsersDataSource.getAllUsers();
		res.send(users);
	})
	.post(async (req, res) => {
		const createdUser = await UsersDataSource.createUser(req.body);
		res.send(createdUser);
	});

export default users;
