import createError from 'http-errors';
import {NextFunction, Response, Request} from 'express';
import morgan from 'morgan';
import logger from '../utils/logger';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	if (!req.auth?.userId) {
		return next(createError(401, 'user is not logged in'));
	}
	next();
}
