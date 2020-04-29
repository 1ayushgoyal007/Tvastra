var mongoose = require("mongoose");

var hospitalSchema = mongoose.Schema({
    name: String,
    image: String,
    specialization: String,
    treatments: String ,
    doctors: Number,
    address: String,
    beds: Number, 
    fees: Number,
    infrastructure: String
})

module.exports = mongoose.model("hospital",hospitalSchema);