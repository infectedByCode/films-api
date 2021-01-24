import * as Knex from 'knex';
import films from '../data/films.json';
import users from '../data/users.json';
import userCreds from '../data/user_creds.json';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.migrate.rollback();
  await knex.migrate.latest();

  // Inserts seed entries
  await knex('films').insert(films);
  await knex('users').insert(users);
  await knex('user_creds').insert(userCreds);
}
