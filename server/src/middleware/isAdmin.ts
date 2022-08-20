import {NextFunction, Request, Response} from 'express';
import createError from 'http-errors';

import {UserDocument} from './../models/User';

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
	const {isAdmin} = req.user as UserDocument;

	if (isAdmin) {
		next();
	} else {
		next(createError(401, 'User is not admin'));
	}
}
