var Promise = require('bluebird');

var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser');

var env = process.env.NODE_ENV || 'development';
var knexConfig = require('../knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

 var Users = bookshelf.Model.extend ({
        tableName: 'users'
    });


/* GET home page. */
router.get('/', function(req, res, next) {

console.log(cookie.value);
    //check cookie and act accordingly
    if(cookie.domain === 'localhost' ) {
        new Users({user_name:cookie.value})
        .fetch()
        .then(function(model){
            if(model !== null) {
                res.render('userpage'); 
   
            } else {
                res.render('login');
            }

        });

        //use cookie.value go to db grab their
        //minions, followers,feed, etc
        //get minion obj, overlord obj, twits obj
        res.render('userpage', {user_name: model.attributes.user_name});
    } else {
      res.render('login', { title: 'Express' });
    }
});

router.post('/login', function(req, res, next){
    
    //bookshelf command to check database for username
    
    var usernameValid = function () {
    
        new Users({user_name: req.body.user_name})
            .fetch()
            .then(function(model){
            if(model !== null) {
                if(model.attributes.password === req.body.password) {
                    res.cookie('user_name',req.body.user_name); 
                    res.cookie('password',req.body.password);
                    res.render('userpage'); 
                } else {
                    console.log('your password does not match').done();

                } 
            } else {
                console.log('this user does not exist');
            }               
        });
    }
        
    usernameValid();
 
    //bookshelf command to check database for password
    //if match, render homepage
    //if not, throw error
});

router.post('/signup',function(req,res,next){

    res.cookie('user_name',req.body.user_name ); 
    res.cookie('password',req.body.password);

    Users.forge({ user_name: req.body.user_name, password:req.body.password }).save().then(function(user) {
        console.log('user added %j',user);
    });

    res.render('userpage');
});

router.get('/userpage',function(req,res,next){
    res.render('userpage');
});

module.exports = router;
