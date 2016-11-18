var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlawareObj={};

middlawareObj.checkCampgroundOwnership= function(req,res,next) {
    if(req.isAuthenticated()){
        
           Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                res.redirect('back');
            }else {
                //foundcamp is a mongoose object , req.user is string wygladaja tak samo nie mozna ich porownac..foundCampground.author.id===req.user._id  ale uzywamy mongoose.equals()
                
                if (foundCampground.author.id.equals(req.user._id)) {
                     next();
                }else {
                    req.flash('error','You don\'t have permission to do that!');
                    res.redirect('back');
                }
                 
            }
        });
    }else {
        req.flash('error', "You need to be logged in to do that!");
        res.redirect('back');
    }
 
}

middlawareObj.checkCommentOwnership = function(req,res,next) {
    if(req.isAuthenticated()){
        
           Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect('back');
            }else {
                //foundcamp is a mongoose object , req.user is string wygladaja tak samo nie mozna ich porownac..foundCampground.author.id===req.user._id  ale uzywamy mongoose.equals()
                
                if (foundComment.author.id.equals(req.user._id)) {
                     next();
                }else {
                if (foundComment.author.id.equals(req.user._id)) {
                     next();
                }else {
                    req.flash('error','You don\'t have permission to do that!');
                    res.redirect('back');
                }
                 
            }
        });
    }else {
        req.flash('error','You need to be logged in to do that!');
        res.redirect('back');
    }
 
}

middlawareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }

middlawareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error','You need to be logged in to do that!');
    res.redirect('/login');
}





module.exports = middlawareObj;