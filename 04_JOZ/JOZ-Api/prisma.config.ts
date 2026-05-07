import 'dotenv/config';
import { defineConfig } from 'prisma/config';

function buildDatabaseUrl() {
	const host = process.env.DB_HOST;
	const port = process.env.DB_PORT;
	const user = process.env.DB_USER;
	const password = process.env.DB_PASSWORD;
	const database = process.env.DB_NAME;

	if (!host || !port || !user || !password || !database) {
		throw new Error('Missing database environment variables for Prisma config.');
	}

	const encodedUser = encodeURIComponent(user);
	const encodedPassword = encodeURIComponent(password);

	return `mysql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
}

const databaseUrl = process.env.DATABASE_URL || buildDatabaseUrl();

export default defineConfig({
	schema: 'prisma/schema.prisma',
	datasource: {
		url: databaseUrl,
	},
});