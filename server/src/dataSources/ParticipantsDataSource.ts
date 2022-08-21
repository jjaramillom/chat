import ParticipantModel, {Participant, ParticipantDocument} from '../models/Participant';
import {Room} from '../models/Room';

export default class ParticipantsDataSource {
	public async list(): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find();

		return result.map(addId);
	}

	public async listByRoomId(roomId: string): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find({room: roomId});
		return result.map(addId);
	}

	public async listByUserId(userId: string): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find({userId});
		return result.map(addId);
	}

	public async listByUserIdRoomPopulated(
		userId: string
	): Promise<(Omit<ParticipantDocument, 'room'> & {room: Room})[]> {
		const result = await ParticipantModel.find({userId}).populate<{room: Room}>('room');
		return result.map(addId);
	}

	public async create(participant: Omit<Participant, 'id'>): Promise<ParticipantDocument | null> {
		const result = await ParticipantModel.create(participant);
		return addId(result);
	}
}

function addId<T>(participant: T & {id: string; _id: string}): T {
	participant.id = participant._id;
	return participant;
}
