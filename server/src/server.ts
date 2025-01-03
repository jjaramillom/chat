import {clerkMiddleware} from '@clerk/express';
import bodyParser from 'body-parser';
import express, {NextFunction, Request, Response, Router} from 'express';
import createError, {HttpError} from 'http-errors';

import {validateEnv} from './env';
import {authMiddleware, loggerMiddleware} from './middleware';
import chatsRouter from './routes/chatsRouter';
import membersRouter from './routes/membersRouter';
import usersRouter from './routes/usersRouter';
import {env, logger} from './utils';

validateEnv();

const app = express();

app.use(bodyParser.json());

app.use(loggerMiddleware);
app.use(clerkMiddleware({signInUrl: 'test'}));

app.use(
	'/api',
	Router().get('/test', (req, res) => {
		res.send('test');
	})
);
app.use(authMiddleware);
app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/members', membersRouter);

const port = env('PORT', '5000');

// catch 404 and forward to error handler
app.use((_, __, next: NextFunction) => {
	next(createError(404, 'page not found'));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	logger.error(err);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send({error: err.message});
});

app.listen(port, () => {
	logger.info(`Chart server is running on http://localhost:${port}`);
});

// Exported for testing
export default app;
