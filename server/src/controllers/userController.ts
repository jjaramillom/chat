import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';

import {UsersDataSource} from '../dataSources';

const usersDataSource = new UsersDataSource();

export async function getAllUsers(
	_: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const users = await usersDataSource.list();
		res.status(200);
		res.send(users);
	} catch (error) {
		return next(createError(500, 'could not fetch users from database'));
	}
}
