import { PrismaClient } from '@prisma/client';
import config from './config';

function buildDatabaseUrl() {
	const { host, port, user, password, database } = config.db;
	const encodedUser = encodeURIComponent(String(user));
	const encodedPassword = encodeURIComponent(String(password));
	return `mysql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
}

const databaseUrl = process.env.DATABASE_URL || buildDatabaseUrl();

// Aseguramos que Prisma vea `DATABASE_URL` en tiempo de ejecución.
process.env.DATABASE_URL = databaseUrl;

const prisma = new PrismaClient();

export default prisma;
