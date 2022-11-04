const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config({path: __dirname+"/config.env"})

const bookmarks = require("./readLater.schema");

app.get("/", async (req, res)=>{
    let token = req.headers.token;
    if(token){
        try{
            let user = jwt.verify(token, process.env.SECRET_PASS);
            let id = user.id;
            let saved = await bookmarks.find().populate({path : "blog", populate : { path : "user" , select: "-password"}}).populate("user", {password: 0});
            res.send(saved)
        }catch(e){
            return res.status(401).send("Token invalid")
        }
    }else{  
        return res.status(401).send("Token required");
    }
})

app.post("/", async (req,res)=>{
    let token = req.headers.token;
    let {blog} = req.body;
    if(token){
        try{
            let user = jwt.verify(token, process.env.SECRET_PASS);
            let id = user.id;
            let saved = await bookmarks.create({user: id , blog});
            res.send(saved)
        }catch(e){
            return res.status(401).send("Token invalid")
        }
    }else{  
        return res.status(401).send("Token required");
    }
})


module.exports = app;