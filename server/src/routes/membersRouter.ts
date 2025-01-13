import {Router} from 'express';

import {
	createChatMember,
	getChatMembers,
} from '../controllers/chatMemberController';

const membersRouter = Router();

membersRouter.route('/:chatId').get(getChatMembers).post(createChatMember);

export default membersRouter;
