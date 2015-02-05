var Promise = require('bluebird');

var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser');

// var env = process.env.NODE_ENV || 'development';
// var knexConfig = require('../knexfile.js')[env];
// var knex = require('knex')(knexConfig);
// var bookshelf = require('bookshelf')(knex);


/* GET home page. */
router.get('/', function(req, res, next) {
    //check cookie and act accordingly
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next){
    //bookshelf command to check database for username
    //bookshelf command to check database for password
    //if match, render homepage
    //if not, throw error
})

router.post('/',function(req,res,next){

    res.cookie('user_name',req.body.user_name ); 
    res.cookie('password',req.body.password);

    // var Users = bookshelf.Model.extend ({
    //     tableName: 'users'
    // });
    // Users.forge({ user_name: req.body.user_name, password:req.body.password }).save().then(function(user) {
    //     console.log('user added %j',user);
    // });
});

module.exports = router;
