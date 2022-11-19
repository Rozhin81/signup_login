const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard")

const factorSchema = new mongoose.Schema({
    FactorName : String ,
    Seller : String ,
    Buyer : String , 
    own : {type:mongoose.Types.ObjectId , ref : "Owner"}
});
//create model for factorSchema
const factorModel = new mongoose.model("Factor",factorSchema);

module.exports = {factorModel}