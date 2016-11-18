var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// =============================
// ROOT ROUTE
// ==============================

router.get('/', function(req,res) {
    res.render('landing');
});



// =============================
// AUTH ROUTES
// ==============================

// =====================
// REGISTER ROUTES
// =====================

router.get('/register',(req,res)=> {
    res.render('register');
});

router.post('/register',(req,res)=> {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err, user) {
        if(err) {
            req.flash('error', err.message);
           return res.render('register');
        }
        passport.authenticate('local')(req,res,function() {
            req.flash('success','Welcome to YelpCamp '+user.username);
            res.redirect('/campgrounds');
        });
    });
});

// =====================
// LOGIN ROUTES
// =====================

router.get('/login',(req,res)=> {
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'

}),(req,res)=> {
  
});

// =====================
// LOGOUT ROUTES
// =====================
router.get('/logout',(req,res)=> {
    req.logout();
    req.flash("success", "You successfuly logged out!")
    res.redirect('/campgrounds');
});


module.exports = router;
