var express = require("express");
var app = express();
var path = require("path");
var ejs = require('ejs');
app.set('view engine','ejs');
var mongoose =  require("mongoose");
var passport = require('passport');
var flash = require('connect-flash');
var localStrategy = require('passport-local');
var TotpStrategy = require('passport-totp').Strategy;
var Nexmo = require('nexmo');


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(flash())

//Changing Directory PAth-------------------->
const viewsPath = path.join(__dirname,'./client/views');
app.set("views",viewsPath);
var assetsPAth = path.join(__dirname,'./client/assets');
app.use(express.static(assetsPAth));


//DB COnnectivity
mongoose.connect("mongodb://localhost/Tvastra",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// Requiring Models
var Doctor = require("./backend/databases/doctor");
var Hospital = require("./backend/databases/hospital");
var User = require("./backend/databases/user");


//Passport Configuration----------------------------->
app.use(require("express-session")({
    secret:"Once Again I am Here!!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});

//Routes-------------------->
app.get("/",isloggedIn,function(req,res){
    
    res.redirect("/index");
})

app.get("/index",isloggedIn,function(req,res){
    res.render("index");
})

app.get("/doctor",isloggedIn,function(req,res){

    Doctor.find({},function(err,allDocotrs){
        if(err){
            console.log(err);
        }else{
            res.render("doctor",{doctors:allDocotrs});
        }
    })
})

app.get("/hospital",isloggedIn,function(req,res){
    Hospital.find({},function(err,allHospitals){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("hospital",{hospitals:allHospitals});
        }
    });
});

app.get("/treatment",isloggedIn,function(req,res){
    res.render("treatment");
})

app.get("/contact-us",isloggedIn,function(req,res){
    res.render("contact-us");
})

app.get("/about",isloggedIn,function(req,res){
    res.render("about");
})

app.get("/tvastra-plus",isloggedIn,function(req,res){
    res.render("tvastra-plus");
})

app.get("/submit-your-query",isloggedIn,function(req,res){
    res.render("submit-your-query");
})

app.get("/FAQ",isloggedIn,function(req,res){
    res.render("FAQ");
})



//Register-Route------------------->
// GET Route
app.get("/sign-up",isloggedOut,function(req,res){
    res.render("sign-up");
})

//POST Route
app.post("/sign-up",isloggedOut,function(req,res){
    var newUser = new User({username: req.body.username,name: req.body.name , contactNo : req.body.contactNo});
    console.log(req.body.password);
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log("err-------------------------------------------------------------->",err);
            req.flash("error",err.message)
            return res.redirect("back");
        }
        else{
            console.log("user------------------------------------------------------------->",user);
            res.redirect("/login");
        }
    }) 
});





//Login Route-------------------------------->
//GET Route
app.get("/login",isloggedOut,function(req,res){
    res.render("login");
});

//POST Route
app.post('/login',isloggedOut,passport.authenticate('local',{
    successRedirect:"/index",
    failureRedirect:"/login",
    successFlash:"Login Successfully",
    failureFlash:"Invalid Email or Password"
}),function(req,res){
    //Do Nothing!
});




//Logout Route-------------------->
app.get("/logout",isloggedIn,function(req,res){
    req.flash("success","Logout Successfully");
    req.logout();
    res.redirect("/login");
})



//Doc-admin-------------------------->
app.get("/doctor/new",isloggedIn,function(req,res){
    res.render("doc-admin");
});

app.post("/doctor",isloggedIn,function(req,res){
    var name= req.body.name;
    var image = req.body.image;
    var specialization = req.body.specialization;
    var treatments = req.body.treatments;
    var experience= req.body.experience;
    var qualification = req.body.qualification;
    var awards = req.body.awards;
    var location = req.body.location;
    var fees = req.body.fees;

    var newDoctor = {
        name:name,
        image :image,
        specialization:specialization,
        treatments:treatments,
        experience:experience,
        qualification:qualification,
        awards:awards,
        location:location,
        fees:fees
    }

    Doctor.create(newDoctor,function(err,newlyDoctor){
        if(err){
            console.log(err);
        }else{
            console.log("you got itAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",newlyDoctor);
            res.redirect("/doctor");
        }
    });
});

//Book an Appointment Route---------------->
app.get("/doctor/book-appointment",isloggedIn,function(req,res){
    res.render("book-appointment");
})



//Hospital Admin------------------------------->
app.get("/hospital/new",isloggedIn,function(req,res){
    res.render("hospital-admin");
});

app.post("/hospital",isloggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var specialization = req.body.specialization;
    var treatments  = req.body.treatments;
    var doctors = req.body.doctors;
    var address = req.body.address;
    var beds = req.body.beds;
    var fees = req.body.fees;
    var infrastructure = req.body.infrastructure;

    var newHospital = {
        name:name,
        image:image,
        specialization : specialization,
        treatments : treatments,
        doctors : doctors,
        address:address,
        beds: beds,
        fees: fees,
        infrastructure: infrastructure
    }
    Hospital.create(newHospital,function(err,newlyHospital){
        if(err){
            console.log(err);
        }else{
            console.log(newlyHospital);
            res.redirect("/hospital");
        }
    })
})



//Show Individual Doctor Profile Route------->
app.get("/doctor/:id",isloggedIn,function(req,res){
    var id = req.params.id;
    Doctor.findById(id).populate().exec(function(err,foundDoctor){
        if(err){
            console.log(err);
        }else{
            console.log(foundDoctor);
            res.render("doc-profile",{doc:foundDoctor});
        }
    });
});


//Show individual Hospital Profile------------>
app.get("/hospital/:id",isloggedIn,function(req,res){
    var id = req.params.id;
    Hospital.findById(id).populate().exec(function(err,foundHospital){
        if(err){
            console.log(err);
        }else{
            console.log(foundHospital);
            res.render("hospital-profile",{hospital:foundHospital});
        }
    })
});


app.get("*",isloggedIn,function(req,res){
    req.flash("error","Invalid Url");
    res.render('default');
})



//MiddleWare-------------------------->
function isloggedIn(req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }else{
        req.flash("error","Login First!");
        res.redirect("/login");
    }
}

function isloggedOut(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('/index');
    }else{
        return next();
    }
}

app.listen(5000,function(){
    console.log("Server Started Listening at 5000");
})
