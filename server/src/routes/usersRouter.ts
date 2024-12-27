import {Router} from 'express';

import {getAllUsers} from '../controllers/userController';
import {logger} from '../utils';
import {requireAuth} from '@clerk/express';

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers);

export default usersRouter;
