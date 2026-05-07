import config from './config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
const { PrismaClient: PrismaClientClass } = require('@prisma/client');
type PrismaClient = import('@prisma/client').PrismaClient;

function buildDatabaseUrl() {
	const { host, port, user, password, database } = config.db;
	const encodedUser = encodeURIComponent(String(user));
	const encodedPassword = encodeURIComponent(String(password));
	return `mysql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
}

const databaseUrl = process.env.DATABASE_URL || buildDatabaseUrl();

// Aseguramos que Prisma vea `DATABASE_URL` en tiempo de ejecución.
process.env.DATABASE_URL = databaseUrl;

const { host, port, user, password, database } = config.db;

const adapter = new PrismaMariaDb({
	host: String(host),
	port: Number(port),
	user: String(user),
	password: String(password),
	database: String(database),
});

const rawPrisma = new PrismaClientClass({ adapter });

// Proxy para mantener camelCase en el código, mapeando a los nombres generados (todo en minúsculas)
const handler: ProxyHandler<any> = {
	get(target, prop, receiver) {
		if (typeof prop === 'symbol') return Reflect.get(target, prop, receiver);
		const propStr = String(prop);
		if (propStr in target) return (target as any)[propStr];
		const lower = propStr.toLowerCase();
		if (lower in target) return (target as any)[lower];
		return Reflect.get(target, prop, receiver);
	},
};

const prisma = new Proxy(rawPrisma, handler) as unknown as PrismaClient;

export default prisma;
