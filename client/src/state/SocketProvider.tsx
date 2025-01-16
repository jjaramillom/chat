import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import {useAuth} from '@clerk/clerk-react';
import {io, Socket} from 'socket.io-client';

export interface SocketContext {
	socket: Socket | null;
}

const socketContext = createContext<SocketContext>({
	socket: null,
});

const SocketProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [socket, setSocket] = useState<SocketContext['socket']>(null);
	const auth = useAuth();

	useEffect(() => {
		(async () => {
			if (auth.isSignedIn && !socket) {
				const token = await auth.getToken();
				const newSocket = io('/', {
					auth: {
						token,
					},
				});
				newSocket.connect();
				setSocket(newSocket);
			} else if (!auth.isSignedIn && socket) {
				socket.disconnect();
				setSocket(null);
			}
		})();
	}, [auth]);

	return (
		<socketContext.Provider
			value={{
				socket,
			}}
		>
			{children}
		</socketContext.Provider>
	);
};

const useSocketContext = (): SocketContext => useContext(socketContext);

export {socketContext, useSocketContext};
export default SocketProvider;
