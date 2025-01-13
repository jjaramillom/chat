import {Router} from 'express';

import {createMessage, getMessages} from '../controllers/messageController';

const messagesRouter = Router();

messagesRouter.route('/:chatId').get(getMessages).post(createMessage);

export default messagesRouter;
