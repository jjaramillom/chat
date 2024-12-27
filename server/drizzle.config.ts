import {defineConfig} from 'drizzle-kit';
import dotEnv from 'dotenv';

dotEnv.config();
dotEnv.config({path: '.env.local', override: true});

export default defineConfig({
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
