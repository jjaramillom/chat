import dotEnv from 'dotenv';
import {z} from 'zod';
import {logger} from './utils';

dotEnv.config();
dotEnv.config({path: '.env.local', override: true});

const schema = z.object({
	PORT: z.string().refine(
		(val) => {
			const parsedValue = parseInt(val);
			return !isNaN(parsedValue) && parsedValue > 0;
		},
		{message: 'PORT must be a positive integer'}
	),
	LOG_LEVEL: z.enum([
		'error',
		'warn',
		'info',
		'http',
		'debug',
		'silly',
	] as const),
	DATABASE_URL: z.string(),
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
});

export function validateEnv() {
	const parsed = schema.safeParse(process.env);

	if (parsed.success === false) {
		logger.error(
			`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
		);
		process.exit(1);
	}
}
