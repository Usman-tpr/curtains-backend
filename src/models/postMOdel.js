const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
       image:{
        type:[String]
       },
       title:{
        type:String
       },
       description:{
        type:String
       }
})

module.exports = mongoose.model("CurtainPost" , adminSchema)