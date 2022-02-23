import {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';

import {UserDocument} from './../models/User';
import {env} from '../utils';

export function login(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {username, name} = req.user as UserDocument;
	const token = sign({username, name, expiresIn: Date.now() + Number(env('JWT_EXPIRES_IN')) * 1000}, env('JWT_SECRET'));
	res.status(200).send({token});
}
