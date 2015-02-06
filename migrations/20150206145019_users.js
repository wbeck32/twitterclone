'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('user_name');
    table.string('password');
    table.timestamp('timestamp').defaultTo(knex.raw('now()'));
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');

};
