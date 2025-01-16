import {clerkMiddleware} from '@clerk/express';
import bodyParser from 'body-parser';
import {NextFunction, Request, Response, Router} from 'express';
import createError, {HttpError} from 'http-errors';

import app from './app';
import {validateEnv} from './env';
import server from './httpServer';
import {authMiddleware, loggerMiddleware} from './middleware';
import chatsRouter from './routes/chatsRouter';
import membersRouter from './routes/membersRouter';
import messagesRouter from './routes/messagesRouter';
import usersRouter from './routes/usersRouter';
import {env, logger} from './utils';

import './subscriptions/socket';

validateEnv();

app.use(bodyParser.json());

app.use(loggerMiddleware);
app.use(clerkMiddleware({signInUrl: 'test'}));

app.use(authMiddleware);
app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/members', membersRouter);
app.use('/api/messages', messagesRouter);

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

server.listen(port, () => {
	logger.info(`Chat server is running on http://localhost:${port}`);
});

// Exported for testing
export default app;
