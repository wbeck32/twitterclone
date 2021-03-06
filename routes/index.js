//redis setup
// var redis = require("redis"),
// client = redis.createClient();

var Promise = require('bluebird');

var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser');
//knex setup
var env = process.env.NODE_ENV || 'development';
var knexConfig = require('../knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);
//DB table definitions
var Users = bookshelf.Model.extend ({
    tableName: 'users'
});
var Twits = bookshelf.Model.extend({
    tableName: 'twits',
    userNames: function() {
        return this.belongsTo(Users);
    }
})
var Connections = bookshelf.Model.extend({
    tableName: 'connections',
    userNames: function(){
        return this.belongsTo(Users);
    }
})



/* GET home page. */
router.get('/', function(req, res, next) {
      //check cookie and act accordingly
    if(req.cookies.user_name) {
        new Users({user_name: req.cookies.user_name})
        .fetch()
        .then(function(model){
            if(model !== null) {
                res.redirect('/userpage'); 
   
            } else {
                res.redirect('/login');
            }

        });

        //use cookie.value go to db grab their
        //minions, followers,feed, etc
        //get minion obj, overlord obj, twits obj
    } else {
      res.render('login', { title: 'Express' });
    }
});

router.get('/signup', function(req, res, next) {

    res.render('signup')

});

router.post('/login', function(req, res, next){
    var minions = [];
    //bookshelf command to check database for username
    
    var usernameValid = function () {
    
        new Users({user_name: req.body.user_name})
            .fetch()
            .then(function(model){
            if(model !== null) {
                if(model.attributes.password === req.body.password) {
                    res.cookie('user_name',req.body.user_name);  
                    res.cookie('password',req.body.password);
                    res.cookie('id', model.attributes.id);

                    res.redirect('/userpage'); 
                } else {
                    console.log('your password does not match').done();

                } 
            } else {
                console.log('this user does not exist');
            }               
        });
    }

    usernameValid(); 

});

router.post('/signup',function(req,res,next){

    res.cookie('user_name',req.body.user_name); 
    res.cookie('password',req.body.password);

    Users.forge({ user_name: req.body.user_name, password:req.body.password }).save().then(function(user) {
        console.log('user added %j',user);
    });

    res.render('userpage');
});

router.get('/userpage',function(req,res,next){


    
    var newUserId = parseInt(req.cookies.id);
    knex.select('*').from('connections').join('users', 'users.id', 'connections.user_id_overlord')  
    .then(function(table){
        var overlords = [];
        for (var i = 0; i < table.length; i++) {

            if(table[i].user_id_minion === newUserId){
                overlords.push(table[i].user_name);
            }
        }
        knex.select('*').from('connections').join('users', 'users.id', 'connections.user_id_minion')  
        .then(function(table){
            var minions = [];
            for (var i = 0; i < table.length; i++) {
                if(table[i].user_id_overlord === newUserId){
                    minions.push(table[i].user_name);
                }
            }
            
             new Users({user_name: req.cookies.user_name})
                .fetch()
                .then(function(model){
                   var userId = model.attributes.id;

                   new Twits()
                   .query('where', 'user_id', '=', userId)
                   .fetchAll({withRelated: ['userNames']})
                   .then(function(twitContent){
                        
                        
                        // twitContent.models[0].relations.userNames.attributes.user_name
                        var twits = twitContent;
                        console.log(minions);
                        res.render('userpage', {username: req.cookies.user_name, twits: twits.models, minions: minions, overlords: overlords})
                    
                    }) 
                     
                })
                 
            })  
             
        }) 
        
});

module.exports = router;
