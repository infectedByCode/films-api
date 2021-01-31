import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_creds', (table) => {
    table.increments('id').primary();
    table.string('password').notNullable();
    table.uuid('user_id').references('uid').inTable('users').onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_creds');
}
