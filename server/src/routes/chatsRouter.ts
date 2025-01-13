import {Router} from 'express';

import {getChats, createChat} from '../controllers/chatController';
import { createMessage, getMessages } from '../controllers/messageController';

const chatsRouter = Router();

chatsRouter.route('/').get(getChats).post(createChat);
chatsRouter.route('/:chatId/messages').get(getMessages).post(createMessage); 

export default chatsRouter;
