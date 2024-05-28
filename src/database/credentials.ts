import * as dotenv from 'dotenv';
dotenv.config();

type DBCredentials = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

let user: string;
let password: string;
let host: string;
let port: number;
let database: string;

const NODE_ENV = process.env.NODE_ENV;

console.log({ NODE_ENV });

if (NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
  user = process.env.DB_USER;
  password = process.env.DB_PASS;
  host = process.env.DB_HOST;
  port = parseInt(process.env.DB_PORT);
  database = process.env.DATABASE;
}

if (NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
  user = process.env.POSTGRES_USER;
  password = process.env.POSTGRES_PASSWORD;
  host = process.env.POSTGRES_HOST;
  port = parseInt(process.env.POSTGRES_PORT);
  database = process.env.POSTGRES_DATABASE;
}

export const dbCredentials: DBCredentials = {
  user,
  password,
  host,
  port,
  database,
};

console.log({ dbCredentials });
