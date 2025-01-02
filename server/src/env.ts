import {z} from 'zod';

import {logger} from './utils';

const LOG_LEVELS = ['error', 'warn', 'info', 'http', 'debug', 'silly'] as const;

const schema = z.object({
	PORT: z.string().refine(
		(val) => {
			const parsedValue = parseInt(val);
			return !isNaN(parsedValue) && parsedValue > 0;
		},
		{message: 'PORT must be a positive integer'}
	),
	LOG_LEVEL: z.enum(LOG_LEVELS),
	DATABASE_URL: z.string(),
	CLERK_PUBLISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
});

export function isLogLevelValid() {
	const logLevel = process.env.LOG_LEVEL;

	if (!logLevel) return true;

	if (!['error', 'warn', 'info', 'http', 'debug', 'silly'].includes(logLevel as any)) {
		return false;
	}
}

export function validateEnv() {
	const parsed = schema.safeParse(process.env);

	if (parsed.success === false) {
		logger.error(
			`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
		);
		process.exit(1);
	}
}
