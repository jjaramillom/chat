import express from 'express';
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import {env} from './utils/env';
import MongoDBConnection from './services/MongoDbConnection';
import usersRouter from './routes/users';

dotEnv.config();

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/user', usersRouter);

const port = env('PORT', '5000');

MongoDBConnection.connect();

app.listen(port, () => {
	console.log(`Chart server is running on ${port}.`);
});
