import mysql from 'mysql2/promise';
import config from './config';

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port as number,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, params || []);
  return rows as T[];
}

export default pool;
