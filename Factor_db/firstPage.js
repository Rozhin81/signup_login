/* 
    create otp code in otpPage.js and import it here
    this is related to the first page(login page) :
    1-expire code after 1 minute ,
    2-check duplicate phone
*/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const otp = require("./otpPage");
const { check, validationResult } = require("express-validator");
const second = require("./secondPage")
const userInfo = second.userInfo
const third = require("./thirdPage");
const { token } = require("morgan");
const writeFactor = third.Factor

app.listen(3000, () => console.log("Server Started"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("views", "../views");
app.set("view engine", "pug");

//connect to Rahavard Database in mongooDB
mongoose.connect("mongodb://localhost:27017/rahavard").
    catch(error => handleError(error))


app.get("/", (req, res) => {
    res.render("phoneLogin")
});


app.post("/login" , async(req,res)=>{
const ret = await userInfo.find({Phone : req.body.phone})
console.log(ret)
    if(ret.length ==1 ){
        res.redirect("/login/user")
    }
    else{
        res.redirect("/signUp")
    }
});
// -----------------------------Second Page------------------------------
app.get("/signUp" , (req,res)=>{
    res.render("secondPageForm")
}) ; 

app.post("/signUp" , 
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
    ],
  (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).send({ status: 400, error: error.array() });
    } else if (res.statusCode == "500") {
      res.send({ status: "Not Ok", message: "Cann't connect to the internet" })
    } else {
        let otp_code = otp.otpCode() ;
        let user = new userInfo({
        Name : req.body.name ,
        Phone : req.body.phone ,
        Address : req.body.address ,
        Email : req.body.email ,
        image : req.body.image ,
        Code : otp_code
        })
      user.save();
      console.log(otp_code)
        var token = jwt.sign(user , "Rozhin1381")
        console.log(token)
    //   window.location.replace("http://localhost:3000/login/user")
    res.redirect("/login/user?parameter={'Phone':value}")
    } ;
});

// ---------------------------------------------------------
app.get("/login/user", (req,res)=>{
    res.render("existCode")
});
app.post("/login/user" , async (req,res)=>{
    let queryString = "/login/user?parameter={'Phone':value}".location.search;
    const urlParams = new URLSearchParams(queryString);
    const Phonereq = urlParams.get('Phone')
    console.log(Phonereq);

    let findCode = await userInfo.find({Code : req.body.code}).limit(1);
    const time = Date.now()
    if(findCode.length==1){
        res.send("Successful login")
    }
    else{
        function execute(req,res){
            console.log("Incorrect password");
            // if(time-Date.now<120000){
                const newCode = otp.otpCode();
                console.log(newCode) ;
                userInfo.replaceOne({Phone : Phonereq} , {Code : newCode})
                if(newCode==req.body.code){
                    let token = jwt.sign(userInfo , "Rozhin1381");
                    res.send("Welcome to your account");
                }
                else{
                    console.log("Error in enter code");
                    res.redirect("/login/user")        
                }
            // }
        }
        execute()

        // setInterval(execute,120000)
            // console.log("Expire Code Time")
            // console.log("data")
            // console.log(findCode)
            // if(Date.now()-findCode.Date<120000){
            //     console.log("Incorrect password");
            //     const newCode = otp.otpCode();
            //     console.log(newCode) ;
            //     userInfo.replaceOne({Phone : req.body.phone} , {Code : newCode})
            //     if(newCode==req.body.code){
            //         let token = jwt.sign(userInfo , "Rozhin1381");
            //         res.send("Welcome to your account");
            //     }
            //     else{
            //         console.log("Error in enter code");
            //         res.redirect("/login/user")
            //     }
            // }else{
            //     res.send("Expire Code Time")
            // }
        // }
    }
    });
// })

// -----------------------------THIRD PAGE------------------------------
// app.get("/factor" , (req,res)=>{
//     res.render("thirdPageForm")
// })



// app.post("/factor" ,    [
//     check("factor")
//       .trim()
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
