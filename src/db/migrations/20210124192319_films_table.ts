import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('films', (table) => {
    table.uuid('uid').notNullable().primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('year').notNullable();
    table.string('keywords');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('films');
}
