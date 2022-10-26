const express = require("express");
const nodemailer = require("nodemailer");

const userModel = require("./user.schema");
const otpModel = require("../otps/otps.schema");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: __dirname+"/config.env"})


const app = express.Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'adolph.quigley99@ethereal.email',
        pass: 'R4nK7brvySjzeRemdK'
    }
})
app.post("/signup", async (req, res)=>{
    let {userName, email, password} = req.body;
    try{
        let user = await userModel.findOne({email});
        if(user){
            return res.status(401).send("Email already exists!");
        }
        await userModel.create({email,password, userName, verified : false});
        let otp = Math.floor(Math.random() * 100000);
        await otpModel.create({email: email, otp: otp, verified : false});
        transporter.sendMail({
            to: email,
            from : "blog@gmail.com",
            subject : "Account VErification",
            text: `Account successfully created Here is the OTP : ${otp} to verify your mail ID`
        })
        res.send({message : `Verify your email Id:${email}`});
    }catch(e) {
        res.status(500).send(e.message);
    }
})

app.post("/signup/verify", async (req, res)=>{
    let {email,otp} = req.body;
    if(otp){
        let cred = await otpModel.findOne({email, otp, verified : false});
        if(cred){
            await otpModel.findOneAndUpdate({email, otp, verified : false}, {verified : true});
            let user = await userModel.findOne({email: email});
            let id = user.id;
            let token = jwt.sign({id, email},process.env.SECRET_PASS, {expiresIn: "1 hour"})
            let refreshToken = jwt.sign({id, email},process.env.REFRESH_PASS,{expiresIn: "7 days"})
            res.send({message : "Successfully Verified.", token, refreshToken});
        }else{
            res.status(401).send("OTP is invalid")
        }
    }else{
        res.status(401).send("OTP required");
    }
})

app.post("/login", async(req, res)=>{
    let {email, password} = req.body;
    try{
        let user = await userModel.findOne({email, password});
        if(user){
            let id = user._id;
            let token = jwt.sign({id, email},process.env.SECRET_PASS, {expiresIn: "1 hour"})
            let refreshToken = jwt.sign({id, email},process.env.REFRESH_PASS,{expiresIn: "7 days"})
            res.send({token, refreshToken});
        }
        else{
            return res.status(401).send("Invalid credentials");
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})

app.post("/reset-password/getotp", async (req, res)=>{
    let { email } = req.body;
    if(email){
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send("Email ID does't exists");
        }
        let otp = Math.floor(Math.random() * 100000);
        transporter.sendMail({
            to: email,
            from: "blog@gmail.com",
            subject: "Reset password",
            text: `Here is the OTP ${otp} requested for resetting password`
        });
        otps[email] = otp;
        res.send("OTP sent successfully on email to reset password")
    }else{
        res.status(401).send("Please provide your email to reset password");
    }
})

// route for resetting password with valid OTP
app.post("/reset-password/reset", async (req, res)=> {
    let { email, otp, password } = req.body;
    if(email){
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send("Email ID does't exists");
        }
        if(otps[email]===otp){
            otps = {};
            
            let updatedUser = await userModel.findOneAndUpdate({email}, { password})
            res.send(updatedUser);
        }else{
            res.status(402).send("Invalid OTP");
        }
    }else{
        res.status(401).send("Please provide your email to reset password");
    }
})
module.exports = app;