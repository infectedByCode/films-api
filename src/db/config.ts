import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PW || '',
    database: process.env.NODE_ENV === 'production' ? process.env.DB_NAME || '' : process.env.DB_NAME_DEV || '',
  },
  migrations: {
    directory: './src/db/migrations',
  },
  seeds: {
    directory: './src/db/seeds',
  },
};
