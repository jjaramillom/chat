import {Router} from 'express';

import {login} from '../controllers/authController';
import {authenticate} from '../middleware';

const usersRouter = Router();

usersRouter.route('/login').post(authenticate.authenticate('basic', {session: false}), login);

export default usersRouter;
