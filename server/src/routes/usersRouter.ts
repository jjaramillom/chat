import {Router} from 'express';

import {createUser, getAllUsers} from '../controllers/userController';
import {authenticate} from '../middleware';

const usersRouter = Router();

usersRouter
	.route('/')
	.get(authenticate.authenticate('jwt', {session: false}), getAllUsers)
	.post(authenticate.authenticate('jwt', {session: false}), createUser);

export default usersRouter;
