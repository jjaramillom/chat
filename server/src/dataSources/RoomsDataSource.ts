import RoomModel, {RoomDocument, RoomType, Room} from '../models/Room';
import {logger} from '../utils';

export default class RoomsDataSource {
	public async list(): Promise<RoomDocument[]> {
		const result = await RoomModel.find();

		return result.map(addId);
	}

	public async listByType(type: RoomType): Promise<RoomDocument[]> {
		const result = await RoomModel.find({type});
		return result.map(addId);
	}

	public async create(room: Omit<Room, 'id'>): Promise<RoomDocument | null> {
		const result = await RoomModel.create(room);
		return addId(result);
	}

	public async get(id: string): Promise<RoomDocument | null> {
		try {
			const result = await RoomModel.findById(id);
			return result ? addId(result) : null;
		} catch (error) {
			logger.error(error);
			return null;
		}
	}
}

function addId(room: RoomDocument): RoomDocument {
	room.id = room._id;
	return room;
}
