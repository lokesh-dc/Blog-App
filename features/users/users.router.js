const express = require("express");
const userModel = require("./user.schema");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: __dirname+"/config.env"})


const app = express.Router();


app.post("/signup", async (req, res)=>{
    let {userName, email, password} = req.body;
    try{
        let user = await userModel.findOne({email});
        console.log(user)
        if(user){
            return res.status(401).send("Email already exists!");
        }
        await userModel.create({email,password, userName});
        let token = jwt.sign({email},process.env.SECRET_PASS, {expiresIn: "1 hour"})
        let refreshToken = jwt.sign({email},process.env.REFRESH_PASS,{expiresIn: "7 days"})
        res.send({message:"User created Successfully", token, refreshToken});
    }catch(e) {
        res.status(500).send(e.message);
    }
})


app.post("/login", async(req, res)=>{
    let {email, password} = req.body;
    try{
        let user = await userModel.findOne({email, password});
        if(user){
            let token = jwt.sign({email},process.env.SECRET_PASS, {expiresIn: "1 hour"})
            let refreshToken = jwt.sign({email},process.env.REFRESH_PASS,{expiresIn: "7 days"})
            res.send({message:"User created Successfully", token, refreshToken});
        }
        else{
            return res.status(401).send("Invalid credentials");
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})


module.exports = app;