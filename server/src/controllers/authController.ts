import {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';

import {UserDocument} from './../models/User';
import {env} from '../utils';

export function login(req: Request, res: Response) {
	const {username, name, id, isAdmin} = req.user as UserDocument;
	const token = sign(
		{username, name, id, isAdmin, expiresIn: Date.now() + Number(env('JWT_EXPIRES_IN')) * 1000},
		env('JWT_SECRET')
	);
	res.status(200).send({token});
}
