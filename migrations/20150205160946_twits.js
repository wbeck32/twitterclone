'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('twits', function(table) {
    table.increments('id').primary();
    table.string('user_id');
    table.string('text');
    table.timestamp('timestamp').defaultTo(knex.raw('now()'));
  });  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('twits');
};
