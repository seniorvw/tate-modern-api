import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('name', 255);
    table.integer('age');
    table.string('location', 255);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
