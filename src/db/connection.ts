import knex from 'knex';
import { dbConfig } from './config';

const db = knex(dbConfig);

export default db;
