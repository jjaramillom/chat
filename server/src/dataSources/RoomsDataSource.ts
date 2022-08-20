import RoomModel, {RoomDocument, RoomType} from '../models/Room';

export default class RoomsDataSource {
	public async list(): Promise<RoomDocument[]> {
		const result = await RoomModel.find();

		return result.map(addId);
	}

	public async listByType(type: RoomType): Promise<RoomDocument[]> {
		const result = await RoomModel.find({type});
		return result.map(addId);
	}

	public async create(room: RoomDocument): Promise<RoomDocument | null> {
		const result = await RoomModel.create(room);
		return addId(result);
	}
}

function addId(room: RoomDocument): RoomDocument {
	room.id = room._id;
	return room;
}
