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

app.listen(3000, () => console.log("Server Started"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("views", "../views");
app.set("view engine", "pug");


//connect to Rahavard Database in mongooDB
mongoose.connect("mongodb://localhost:27017/rahavard").
    catch(error => handleError(error))

//create shema for information in login page (phone , otpcode)
const loginShema = new mongoose.Schema({
    Phone : String ,
    Code : {
       type : String ,
       default : Date.now() ,
       "expireAt" : {
        type : Date ,
        expires : 11}
    }
});
//create model for shema
const login = mongoose.model("login" , loginShema);

//render html page
app.get("/", (req, res) => {
    res.render("phoneLogin")
});

app.post("/" , (req,res)=>{
    res.redirect("/api")
});

app.get("/api" , (req , res)=>{
    res.render("code")
})

app.post("/api",verifyToken , (req,res)=>{

    jwt.verify(req.token , "secretkey" , (err , data)=>{
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json(data)
        }
    })

    //create new user by model
    const user = new login({
        Phone : req.body.Phone,
        Code : otp.otpCode() ,
    });
    //----------------------------------------------------------
    jwt.sign({user : user} , "secretkey",(err,token)=>{
        res.json(token)
    })
    
    //--------------------------------------------------------

    //check if the phoe isn't duplicate , then save into logins collection 
    let checkDuplicate = async function(req,res){
        try{
            let singlePhone = await login.exists({Phone:user.Phone})
            if(singlePhone==null){
                user.save();
                console.log("Saved")
            }
            else{
                console.log("Repeated phone!!")
            }
        }
        catch(error){
            throw error
        }
    }
    checkDuplicate()
    res.send("OK")
} )

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }}