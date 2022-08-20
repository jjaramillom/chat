import express, {Request, Response, NextFunction} from 'express';
import createError, {HttpError} from 'http-errors';
import bodyParser from 'body-parser';

import './env';
import {loggerMiddleware} from './middleware';
import {env, logger} from './utils';
import MongoDBConnection from './services/MongoDbConnection';
import usersRouter from './routes/usersRouter';
import authRouter from './routes/authRouter';

const app = express();
MongoDBConnection.connect();

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const port = env('PORT', '5000');

// catch 404 and forward to error handler
app.use((_, __, next: NextFunction) => {
	next(createError(404, 'page not found'));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
});

app.listen(port, () => {
	logger.info(`Chart server is running on http://localhost:${port}`);
});

// Exported for testing
export default app;
