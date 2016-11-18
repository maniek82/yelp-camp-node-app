var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");




// =====================
// INDEX -Route
// =====================
router.get('/',function(req,res){
   //jesli zalgowany passport tworzy object z id i username ktory mozna pozniej wykorzystac,
   //jesli nie zalogowany to user jest undefined i sprawdzamy w header odpowienio
    Campground.find({},function(err,allCampgrounds){
        err ? console.log(err): res.render('campgrounds/index',{campgrounds: allCampgrounds});
    });
    
});

// =====================
// CREATE -Route
// =====================
router.post('/',middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
     var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, description: description, image: image, author: author};
    Campground.create(newCampground, function(err,campground) {
        err ? console.log(err) : res.redirect('/campgrounds');
    });
    
});

// =====================
// NEW -Route
// =====================
router.get('/new',middleware.isLoggedIn,function(req, res) {
    res.render('campgrounds/new');
});

// =====================
// SHOW-Route
// =====================
router.get('/:id', function(req, res) {
    //ten jest po dodaniu comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        }else {
            res.render('campgrounds/show',{campground: foundCampground});
        }
    });
    // Campground.findById(req.params.id, function(err, foundCampground){
    //     err ? console.log(err) : res.render('show.ejs',{campground: foundCampground});
    //  });
    
});

// =====================
// EDIT Route
// =====================
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req,res)=> {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash('error','Campground not found');
        }
          res.render('campgrounds/edit',{campground: foundCampground});
    });
  
});


// =====================
// UPDATE Route
// =====================
router.put('/:id',middleware.checkCampgroundOwnership,(req,res)=> {
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            req.flash('error','Campground not found');
            res.redirect('/campgrounds');
        }else {
            res.redirect('/campgrounds/'+req.params.id);
        }
        
    })
});

// =====================
// DELETE Route
// =====================
router.delete('/:id',middleware.checkCampgroundOwnership,(req,res)=> {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect('/campgrounds');
        }else {
             res.redirect('/campgrounds');
        }
    });
   
});


module.exports = router;