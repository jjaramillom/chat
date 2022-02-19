import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';

import {UsersDataSource} from '../dataSources';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const users = await UsersDataSource.getAllUsers();
		res.status(200);
		res.send(users);
	} catch (error) {
		return next(createError(500, 'could not fetch users from database'));
	}
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		await UsersDataSource.createUser(req.body);
		res.status(200).end();
	} catch (error) {
		return next(createError(500, 'could not create new user'));
	}
}
