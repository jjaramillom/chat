import morgan from 'morgan';

import logger from '../utils/logger';

const morganMiddleware = morgan(':method :url', {
	immediate: true,
	stream: {
		write: (message) => {
			logger.http(message.trim());
			logger.info(message.trim());
		},
	},
});

export default morganMiddleware;
