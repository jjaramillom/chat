import {Router} from 'express';

import {
	createChatMember,
	getMembers,
} from '../controllers/ChatMemberController';

const roomsRouter = Router();

roomsRouter.route('/').get(getMembers).post(createChatMember);

export default roomsRouter;
