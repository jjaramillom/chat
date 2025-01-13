import {Router} from 'express';

import {getChats, createChat} from '../controllers/chatController';

const chatsRouter = Router();

chatsRouter.route('/').get(getChats).post(createChat);

export default chatsRouter;
