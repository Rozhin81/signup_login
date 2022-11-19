const express = require("express");
var app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const factorModel = require("../models/factorModel").factorModel;
const { check, validationResult } = require("express-validator");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.get("/factor" , (req,res)=>{
    res.render("thirdPageForm")
})


router.post("/factor" ,  
  [
    check("factor")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Fill the FactorName Field"),
    check("seller")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Fill the seller Field"),
    check("buyer")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Fill the buyer Field")
    
    ]  
    , (req,res)=>{

    const newFactor = new Factor({
        FactorName :req.body.factor , 
        Seller : req.body.seller ,
        Buyer:req.body.buyer,
        own : newOwner._id  //edit by token
    });

    newFactor.save();
    Factor.find({}).populate({path:"own"})
    .then(p=>console.log(p))
    .catch(error=>console.log(error))
    res.send("OK")
});

module.exports = router ;