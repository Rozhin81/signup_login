/*
  this code related to second page that is include informaion about user.
  check information about user
*/
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard")

const userSchema = new mongoose.Schema({
    Name : {type:String ,required:true} ,
    Phone : {type:String ,required:true} ,
    Address : {type:String ,required:true} ,
    Email : {type:String ,required:true} ,
    Code : String ,
    image : {type:String } ,
    Date : {
      type : String ,
      default : Date.now()
    }
    
});

const userInfo = new mongoose.model("userInfo" , userSchema) ;


module.exports ={userInfo}