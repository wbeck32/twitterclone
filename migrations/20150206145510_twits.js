'use strict';

exports.up = function(knex, Promise) {
 return knex.schema.createTable('twits', function(table) {
   table.increments('id').primary();
   table.integer('user_id').references('id').inTable('users');
   table.string('text');
   table.timestamp('timestamp').defaultTo(knex.raw('now()'));
 });  
 
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('twits');
};