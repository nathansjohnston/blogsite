/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.integer('author_id');
    table.foreign('author_id').references('id').inTable('users');
    table.string('title');
    table.string('content');
    table.date('creation_date', {precision: 3}).defaultTo(knex.fn.now(3));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};