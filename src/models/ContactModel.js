const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
       name:{
        type:String,
       },
       Address:{
        type:String
       },
       number:{
        type:String
       }
})

module.exports = mongoose.model("CurtainContact" , adminSchema)