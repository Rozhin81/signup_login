/*
    we want to create several factors for just one owner
    so we use 'One By Many' relationship in mongoose
*/

//import mongoose
// const express=require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const{check , validateResult} = require("express-validator")


// app.listen(3000, () => console.log("Server Started"));
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

// app.set("views", "../views");
// app.set("view engine", "pug");


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard")

//create a schema for factors with unique user property 
const factorSchema = new mongoose.Schema({
    FactorName : String ,
    Seller : String ,
    Buyer : String , 
    Date : {
        type : String ,
        default: Date.now()
    } ,
    own : {type:mongoose.Types.ObjectId }
});
//create model for factorSchema
const Factor = new mongoose.model("Factor",factorSchema);

module.exports = {Factor}














// app.get("/" , (req,res)=>{
//     res.render("thirdPageForm")
// })



// app.post("/post" ,    [
//     check("factor")
//     //   .trim()
//       .isLength({ min: 1 })
//       .withMessage("Fill the FactorName Field"),
//     check("seller")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("Fill the seller Field"),
//     check("buyer")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("Fill the buyer Field")
    
//     ]  , (req,res)=>{

//     const newFactor = new Factor({
//         FactorName :req.body.factor , 
//         Seller : req.body.seller ,
//         Buyer:req.body.buyer,
//         own : newOwner._id
//     });
//     newFactor.save();
//     Factor.find({}).populate({path:"own"})
//     .then(p=>console.log(p))
//     .catch(error=>console.log(error))
//     res.send("OK")
//     // res.redirect("/post/s")
// });
