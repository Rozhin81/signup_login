const { check, validationResult } = require("express-validator");
const express = require("express");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
router=express.Router()
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/rahavard")

router.get("/signUp",(req,res)=>{
    res.render("signupForm")
});

router.post("/signUp" ,
    [
        check("email")
        .isEmail()
        .withMessage("Enter correct Email")
        .trim(),
        check("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Fill the Name Field"),
        check("phone")
        .isMobilePhone()
        .withMessage("Enter correct Phone Number"),
        check("address")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Fill the Address Field")
    ] , 
    (req,res)=>{
        const error = validationResult(req).formatWith(({ msg }) => msg);
        const hasError = !error.isEmpty();

        if (hasError) {
        res.status(422).send({ status: 400, error: error.array() });
        } else if (res.statusCode == "500") {
        res.send({ status: "Not Ok", message: "Cann't connect to the internet" })
        } else {
            let user = new userInfo({
            Name : req.body.name ,
            Phone : req.body.phone ,
            Address : req.body.address ,
            Email : req.body.email ,
            image : req.body.image 
            })
        user.save();
        console.log("Yor information successfuly saved");
        res.redirect("/login")
        // res.send("OK")
    };
});

module.exports = router;