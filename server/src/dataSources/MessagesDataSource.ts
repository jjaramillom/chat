import MessageModel, {MessageDocument} from '../models/Message';

export default class MessagesDataSource {
	public async lisByRoomId(roomId: string): Promise<MessageDocument[]> {
		const result = await MessageModel.find({roomId});
		return result.map(addId);
	}

	public async create(message: MessageDocument): Promise<MessageDocument | null> {
		const result = await MessageModel.create(message);
		return addId(result);
	}
}

function addId(message: MessageDocument): MessageDocument {
	message.id = message._id;
	return message;
}
