import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id');
    table.string('content', 2500);
    table.string('name', 255).nullable();

    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('art_id').unsigned();
    table.foreign('art_id').references('arts.id');

    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
    table.dateTime('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
