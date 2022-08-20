import ParticipantModel, {ParticipantDocument} from '../models/Participant';

export default class ParticipantsDataSource {
	public async list(): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find();

		return result.map(addId);
	}

	public async lisByRoomId(roomId: string): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find({roomId});
		return result.map(addId);
	}

	public async listByUserId(userId: string): Promise<ParticipantDocument[]> {
		const result = await ParticipantModel.find({userId});
		return result.map(addId);
	}

	public async create(participant: ParticipantDocument): Promise<ParticipantDocument | null> {
		const result = await ParticipantModel.create(participant);
		return addId(result);
	}
}

function addId(participant: ParticipantDocument): ParticipantDocument {
	participant.id = participant._id;
	return participant;
}
