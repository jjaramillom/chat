import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from 'zod';
import createError from 'http-errors';

import {Participant} from '../models/Participant';
import {UserDocument} from '../models/User';
import {RoomsDataSource, ParticipantsDataSource} from '../dataSources';

interface ParticipantResponse {
	id: string;
	userId: string;
	roomId: string;
}

const roomsDataSource = new RoomsDataSource();
const participantsDataSource = new ParticipantsDataSource();

const participantValidation = z.object({
	roomId: z.string()
});

export async function getParticipants(req: Request, res: Response) {
	const {id} = req.user as UserDocument;

	const participants = await participantsDataSource.listByUserId(id);

	res.status(200).send(participants.map(toParticipantResponse));
}

export async function createParticipant(req: Request, res: Response, next: NextFunction) {
	const {id: userId} = req.user as UserDocument;
	const participantData = req.body;
	try {
		participantValidation.parse(participantData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	const room = await roomsDataSource.get(participantData.roomId);

	if (!room) {
		return next(createError(400, 'Room does not exist'));
	}

	const roomParticipants = await participantsDataSource.listByRoomId(participantData.roomId);

	if (roomParticipants.some((participant) => participant.userId === userId)) {
		return next(createError(400, 'User is is already in the room'));
	}

	try {
		const participant = await participantsDataSource.create({room: participantData.roomId, userId: userId});
		res.status(200).send(participant).end();
	} catch (error) {
		next(createError(500, 'Could not create particpant'));
	}
}

function toParticipantResponse({id, userId, room}: Participant): ParticipantResponse {
	return {id, userId, roomId: room.toString()};
}
