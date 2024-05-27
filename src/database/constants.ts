import * as dotenv from 'dotenv';
dotenv.config();

export const dbConstants = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};
