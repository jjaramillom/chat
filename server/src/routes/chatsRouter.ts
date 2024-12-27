import {Router} from 'express';

import {getChats, createChat} from '../controllers/chatController';

const roomsRouter = Router();

roomsRouter.route('/').get(getChats).post(createChat);

export default roomsRouter;
