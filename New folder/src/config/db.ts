import {Client} from 'pg';

import {DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT} from './constants';

export let client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});

client.connect();
