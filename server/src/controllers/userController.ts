import {UserDocument} from './../models/User';
import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import {z, ZodError} from 'zod';

import {UsersDataSource} from '../dataSources';

const usersDataSource = new UsersDataSource();

const userValidation = z.object({
	name: z.string().min(1).trim(),
	password: z.string().min(5),
	username: z.string().min(5).trim()
});

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const users = await usersDataSource.list();
		res.status(200);
		res.send(users.map(toUserResponse));
	} catch (error) {
		return next(createError(500, 'could not fetch users from database'));
	}
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
	const userData = req.body;
	try {
		userValidation.parse(userData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	const user = await usersDataSource.getByUsername(userData.username);
	if (user) {
		return next(createError(400, 'username already exists'));
	}

	try {
		await usersDataSource.create(req.body);
		res.status(200).end();
	} catch (error) {
		next(createError(500, 'could not create new user'));
	}
}

function toUserResponse(user: UserDocument) {
	return {
		name: user.name,
		username: user.username,
		avatar: user.avatar,
		isAdmin: user.isAdmin
	};
}
