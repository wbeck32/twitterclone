'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('user_name');
    table.string('password');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');

};
