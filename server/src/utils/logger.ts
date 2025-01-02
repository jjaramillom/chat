import {createLogger, format, transports} from 'winston';

import {isLogLevelValid} from '../env';

let logLevel = process.env.LOG_LEVEL ?? 'info';

if (!isLogLevelValid()) {
	logLevel = 'info';
}

export default createLogger({
	level: logLevel,
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.json(),
		format.errors({stack: true}),
		format.printf(({timestamp, level, message}) => {
			const values = [timestamp, level];
			values.push(message);
			const output = values.join(' ');
			return output;
		})
	),
	transports: [new transports.Console({})],
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

global.console.log = noop;
global.console.info = noop;
global.console.debug = noop;
global.console.trace = noop;
global.console.dir = noop;
global.console.dirxml = noop;
global.console.group = noop;
global.console.groupEnd = noop;
global.console.time = noop;
global.console.timeEnd = noop;
global.console.assert = noop;
global.console.profile = noop;
