import morgan from 'morgan';
import logger from '../utils/logger';

const morganMiddleware = morgan(':method :url :status', {
	immediate: true,
	stream: {
		write: (message) => logger.http(message.trim()),
	},
});

export default morganMiddleware;
