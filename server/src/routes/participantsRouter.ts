import {Router} from 'express';

import {createParticipant, getParticipants} from '../controllers/participantController';
import {authenticate} from '../middleware';

const roomsRouter = Router();

roomsRouter
	.route('/')
	.get(authenticate.authenticate('jwt', {session: false}), getParticipants)
	.post(authenticate.authenticate('jwt', {session: false}), createParticipant);

export default roomsRouter;
