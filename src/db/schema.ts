import { db } from './db';

export const setupDatabase = () => {
  db.schema.dropTableIfExists('films').finally(() => db.destroy());
  db.schema
    .createTable('films', (table) => {
      table.uuid('uid');
      table.string('title');
      table.string('description');
      table.integer('year');
      table.string('keywords');
    })
    .finally(() => db.destroy());

  db.schema.dropTableIfExists('users').finally(() => db.destroy());
  db.schema
    .createTable('users', (table) => {
      table.uuid('uid');
      table.string('email');
      table.string('username');
    })
    .finally(() => db.destroy());

  db.schema.dropTableIfExists('user_creds').finally(() => db.destroy());
  db.schema
    .createTable('user_creds', (table) => {
      table.increments('id');
      table.string('username');
      table.string('password');
    })
    .finally(() => db.destroy());
};

setupDatabase();
