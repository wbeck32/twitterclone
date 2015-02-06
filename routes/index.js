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
    tableName: 'twits'
})
var Connections = bookshelf.Model.extend({
    tableName: 'connections'
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

    res.cookie('user_name',req.body.user_name); 
    res.cookie('password',req.body.password);

    Users.forge({ user_name: req.body.user_name, password:req.body.password }).save().then(function(user) {
        console.log('user added %j',user);
    });

    res.render('userpage');
});

router.get('/userpage',function(req,res,next){
    new Users({user_name: req.cookies.user_name})
        .fetch()
        .then(function(model){
           var userId = model.attributes.id;
           new Twits({user_id: userId})
           .fetch()
           .then(function(twitContent){
                var twits = twitContent;
                new Connections({user_id_overlord: userId})
                .fetch()
                .then(function(followers){
                    var minions = followers;
                    new Connections({user_id_minion: userId})
                    .fetch()
                    .then(function(following){
                        var overlords = following;
                        console.log(twits, minions, overlords);
                        res.render('userpage', {twits: twits, minions: minions, overlords: overlords});
                    })
                })
           })  

        })
    
});

module.exports = router;
