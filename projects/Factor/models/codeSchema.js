const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard");

const codeSchema = new mongoose.Schema({
    Phone : {
        type : String ,
        default:"09382565584"
    } , 
    Code : String ,
    Date :{
        type : String , 
        default:Date.now()
    }
})

const codeModel = new mongoose.model("codeModel" , codeSchema);

module.exports = {codeModel} ;