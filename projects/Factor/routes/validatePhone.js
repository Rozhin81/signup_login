const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const userInfo_page = require("../models/userSchema");
const userInfo =userInfo_page.userInfo
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
router=express.Router()

router.get("/login", (req, res) => {
    res.render("phoneLogin")
});


router.post("/login" , async(req,res)=>{
    const findPhone = await userInfo.find({Phone : req.body.phone}).limit(1)
    console.log(findPhone)
        if(findPhone.length ==1 ){
            // console.log("OK")
            res.redirect("/login/user")
        }
        else{
            res.redirect("/signUp")
        }
});

module.exports = router