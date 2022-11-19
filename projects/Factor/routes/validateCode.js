const express = require("express");
var app = express();
const router = express.Router()
const bodyParser = require("body-parser");
const userInfo = require("../models/userSchema").userInfo;
const codeModel = require("../models/codeSchema").codeModel ;
const otpGenerator = require("otp-generator");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard")



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

router.get("/login/user" , (req,res)=>{
    res.render("newCode");
});

router.post("/login/user",(req,res)=>{
    console.log(otp);
    let time = Date.now()
    let codeUser = new codeModel({
        Code : otp 
    })
    if(time-codeUser.Date<70000){
        if(codeUser.Code==req.body.code){
            let token = jwt.sign(userInfo , "Rahavard", function(err, token) {
                console.log(token)});
            res.send("Welcome To Your Page");
        }
        else{
            res.send("incorrect code");
        }
    }
    else{
        res.send("TimeOut");
    };

});

module.exports = router ;