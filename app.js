var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    seedDB                  = require("./seed"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");
    
var commentsRoutes   = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");
    
// ===================== 
// DATABASE CONFIGURATION
// =====================
mongoose.Promise = global.Promise;  
app.use(express.static(__dirname+ "/public"));

var url = process.env.MONGODB_C9 || process.env.MONGODB_URI ||'mongodb://localhost/yelp_camp'; //default 
mongoose.connect(url);//database for heroku

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(flash());
// seedDB();//seed the database

// =====================
// PASSPORT CONFIGURATION
// =====================
app.use(require("express-session")({
    secret: "Some example secret here",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));//ta metoda jest z local-mongoose jesli nei trzeba by bylo ja samemu napisac
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware ktore zapewnia dane o user na kazdej stronie(zamiast recznie dodawac do kazdego routu)
// =======================================
// lOCAL VARIABLE
// =======================================
app.use(function(req,res,next){
    res.locals.currentUser = req.user;//w template sprawdzmy currentUser jako obecnie zalogowany a definiujemy to w tym middlaware np currnteUser a pochodzi z passportjs ktory przechowuje te info
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(methodOverride("_method"));
// =======================================
// REQUIRING ROUTES AND PREFIX CONFIGURATION
// =======================================
app.use("/",authRoutes);
app.use("/campgrounds",campgroundsRoutes);//prefix przed kazdym routem i mozna usunac z inncyh routow
app.use("/campgrounds/:id/comments",commentsRoutes);



app.listen(process.env.PORT,process.env.IP, function(){
    console.log('YelpCamp app running now');
});