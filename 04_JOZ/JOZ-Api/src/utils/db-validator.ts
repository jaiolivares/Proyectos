import config from '../config';
import prisma from '../prisma';
import { logInfo, logError } from './logger';

export async function validateDatabase(): Promise<void> {
  const missing: string[] = [];

  if (!process.env.DATABASE_URL) {
    const { host, port, user, password, database } = config.db;
    if (!host) missing.push('DB_HOST');
    if (!port) missing.push('DB_PORT');
    if (!user) missing.push('DB_USER');
    if (!password) missing.push('DB_PASSWORD');
    if (!database) missing.push('DB_NAME');
  }

  if (missing.length) {
    const msg = `Faltan variables de entorno de BD: ${missing.join(', ')}`;
    logError(msg);
    throw new Error(msg);
  }

  try {
    logInfo('Verificando conexión a la base de datos...');
    await prisma.$connect();
    logInfo('Conexión a la base de datos verificada correctamente.');
  } catch (err) {
    logError('Error conectando a la base de datos', err);
    throw err;
  } finally {
    try {
      await prisma.$disconnect();
    } catch (_) {
      // ignore
    }
  }
}
