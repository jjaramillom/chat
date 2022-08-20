import {Schema, model, Document, Model} from 'mongoose';

export type RoomType = 'public' | 'private';

export interface Room {
	id: string;
	name: string;
	type: RoomType;
}

export type RoomDocument = Room & Document;

const schema = new Schema<RoomDocument, Model<Room>>({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	type: {type: String, required: true}
});

const RoomModel = model<RoomDocument>('Room', schema);

export default RoomModel;
