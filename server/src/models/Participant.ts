import {Schema, model, Document, Model, Types} from 'mongoose';

export interface Participant {
	id: string;
	userId: string;
	room: Types.ObjectId;
}

export type ParticipantDocument = Participant & Document;

const schema = new Schema<ParticipantDocument, Model<Participant>>({
	userId: {type: String, required: true},
	room: {type: Schema.Types.ObjectId, ref: 'Room'}
});

const ParticipantModel = model<ParticipantDocument>('Participant', schema);

export default ParticipantModel;
