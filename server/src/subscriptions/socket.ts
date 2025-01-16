import {verifyToken} from '@clerk/backend';
import {Server, Socket} from 'socket.io';

import {ChatsDataSource} from '../dataSources';
import server from '../httpServer';
import {logger} from '../utils';

export const io = new Server(server);

logger.info('Socket.io server started');

async function getUserId(socket: Socket): Promise<string | null> {
	try {
		const verifiedToken = await verifyToken(
			socket.handshake.auth.token as string,
			{
				jwtKey: process.env.CLERK_JWT_KEY,
			}
		);
		return verifiedToken.sub;
	} catch (error) {
		logger.error('Error setting up ws connection:', error);
		return null;
	}
}

io.use(async (socket, next) => {
	const userId = await getUserId(socket);

	if (!userId) {
		return next(new Error('Unauthorized'));
	}

	(socket as any).userId = userId;

	next();
});

const chatsDataSource = new ChatsDataSource();

// @ts-expect-error userId exists
io.on('connection', async (socket: Socket & {userId: string}) => {
	logger.info(`Socket.io connection established for user ${socket.userId}`);
	const userChats = await chatsDataSource.listUserChats(socket.userId);

	userChats.forEach((chat) => {
		socket.join(`chat_${chat.id}`);
	});

	// TODO when user leaves chat we should remove them from the room
});
