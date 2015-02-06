'use strict';

exports.up = function(knex, Promise) {
 return knex.schema.createTable('connections', function(table) {
   table.increments('id').primary();
   table.integer('user_id_overlord').references('id').inTable('users');
   table.integer('user_id_minion').references('id').inTable('users');
 });  
 
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('connections');
};