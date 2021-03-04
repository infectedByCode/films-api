import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_film_collections', (table) => {
    table.uuid('user_id').references('uid').inTable('users').onDelete('cascade');
    table.uuid('film_id').references('uid').inTable('films').onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users_film_collections');
}
