var env = process.env.NODE_ENV || 'development';
var knexConfig = require('./knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');


var Users = bookshelf.Model.extend ({
	tableName: 'users'
});


Users.forge({ user_name: 'MrCobra',password:'cobra' }).save().then(function(user) {
		console.log('user added %j',user);
	})