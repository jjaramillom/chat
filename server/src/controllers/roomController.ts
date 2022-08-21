import {RoomType} from './../models/Room';
import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from 'zod';
import createError from 'http-errors';

import {Room} from '../models/Room';
import {UserDocument} from '../models/User';
import {RoomsDataSource, ParticipantsDataSource} from '../dataSources';

interface RoomResponse {
	id: string;
	name: string;
	type: RoomType;
}

const roomsDataSource = new RoomsDataSource();
const participantsDataSource = new ParticipantsDataSource();

const roomValidation = z.object({
	name: z.string().min(1).trim(),
	type: z.union([z.literal('public'), z.literal('private')])
});

// By default return only user rooms. If query.all = true, then returns also public rooms
export async function getRooms(req: Request, res: Response) {
	const {id} = req.user as UserDocument;
	const isAll = req.query.all;

	let publicRooms: Room[] = [];
	if (isAll) {
		publicRooms = await roomsDataSource.listByType('public');
	}

	const userParticipants = await participantsDataSource.listByUserIdRoomPopulated(id);

	res.status(200).send([...publicRooms.map(toRoomResponse), userParticipants.map(({room}) => toRoomResponse(room))]);
}

export async function createRoom(req: Request, res: Response, next: NextFunction) {
	const roomData = req.body;
	try {
		roomValidation.parse(roomData);
	} catch (error) {
		return next(createError(400, (error as ZodError).format()));
	}

	try {
		const room = await roomsDataSource.create(roomData);
		res.status(200).send(room).end();
	} catch (error) {
		next(createError(500, 'could not create room'));
	}
}

function toRoomResponse({id, name, type}: Room): RoomResponse {
	return {id, name, type};
}
