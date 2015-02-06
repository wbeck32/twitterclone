'use strict';

exports.up = function(knex, Promise) {
 return knex.schema.createTable('connections', function(table) {
   table.increments('id').primary();
   table.string('user_id_overlord').references('id').inTable('users');
   table.string('user_id_minion').references('id').inTable('users');
   table.string('text');
   table.timestamp('timestamp').defaultTo(knex.raw('now()'));
 });  
 
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('connections');
};