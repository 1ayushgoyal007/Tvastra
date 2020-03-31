
var express = require("express");
var app = express();
var ejs = require('ejs');
app.use(express.static("public"));
app.set('view engine','ejs');



app.get("/",function(req,res){
    res.render('index');
})
app.get("/index",function(req,res){
    res.render("index");
})
app.get("/doctor",function(req,res){
    res.render("doctor");
})

app.get("/hospital",function(req,res){
    res.render("hospital");
})

app.get("/treatment",function(req,res){
    res.render("treatment");
})
app.get("/contact-us",function(req,res){
    res.render("contact-us");
})
app.get("/about",function(req,res){
    res.render("about");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.get("/sign-up",function(req,res){
    res.render("sign-up");
})

app.get("/book-appointment",function(req,res){
    res.render("book-appointment");
})

app.get("/doc-profile",function(req,res){
    res.render("doc-profile");
})
app.get("/hospital-profile",function(req,res){
    res.render("hospital-profile");
})
app.get("/FAQ",function(req,res){
    res.render("FAQ");
})

app.get("*",function(req,res){
    res.render('default');
})

app.listen(3000,function(){
    console.log("Server Started Listening at 3000");
})
