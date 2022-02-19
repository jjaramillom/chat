import {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';

import {UserDocument} from './../models/User';
import {env} from '../utils';

export function login(req: Request, res: Response) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {_id, password, __v, ...payload} = req.user as UserDocument;
	const token = sign(payload, env('JWT_SECRET'));
	res.status(200).send({token});
}
