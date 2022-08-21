import {Schema, model, Document, Model} from 'mongoose';

export interface Message {
	id: string;
	roomId: string;
	senderId: string;
	message: string;
	timestamp: string;
}

export type MessageDocument = Message & Document;

const schema = new Schema<MessageDocument, Model<Message>>({
	roomId: {type: String, required: true},
	senderId: {type: String, required: true},
	message: {type: String, required: true},
	timestamp: {type: String, required: true}
});

export default model<MessageDocument>('Message', schema);
