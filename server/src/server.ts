import express, {Request, Response, NextFunction} from 'express';
import createError, {HttpError} from 'http-errors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import './env';
import {env} from './utils/env';
import MongoDBConnection from './services/MongoDbConnection';
import usersRouter from './routes/usersRouter';
import authRouter from './routes/authRouter';

const app = express();
MongoDBConnection.connect();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);

const port = env('PORT', '5000');

// catch 404 and forward to error handler
app.use((_, __, next: NextFunction) => {
	next(createError(404, 'page not found'));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
});

app.listen(port, () => {
	console.log(`Chart server is running on ${port}.`);
});
