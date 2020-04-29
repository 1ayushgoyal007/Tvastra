var mongoose = require("mongoose");


var docSchema  = mongoose.Schema({
    name: String ,
    image : String ,
    specialization : String ,
    treatments : String ,
    experience : String ,
    qualification: String ,
    awards : String ,
    location : String ,
    fees : String
});

module.exports = mongoose.model("Doctor",docSchema);