import {Router} from 'express';

import {getRooms, createRoom} from '../controllers/roomController';
import {authenticate} from '../middleware';

const roomsRouter = Router();

roomsRouter
	.route('/')
	.get(authenticate.authenticate('jwt', {session: false}), getRooms)
	.post(authenticate.authenticate('jwt', {session: false}), createRoom);

export default roomsRouter;
