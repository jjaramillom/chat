import {Router} from 'express';

import {createUser, getAllUsers} from '../controllers/userController';

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(createUser);

export default usersRouter;
