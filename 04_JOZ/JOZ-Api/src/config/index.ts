import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10,
};

export default config;