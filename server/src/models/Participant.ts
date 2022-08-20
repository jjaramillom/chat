import {Schema, model, Document, Model} from 'mongoose';

type ParticipantType = 'public' | 'private';

export interface Participant {
	id: string;
	userId: string;
	roomId: ParticipantType;
}

export type ParticipantDocument = Participant & Document;

const schema = new Schema<ParticipantDocument, Model<Participant>>({
	id: {type: String, required: true, unique: true},
	userId: {type: String, required: true},
	roomId: {type: String, required: true}
});

const ParticipantModel = model<ParticipantDocument>('Participant', schema);

export default ParticipantModel;
