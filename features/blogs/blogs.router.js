const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");


require("dotenv").config({path: __dirname+"/config.env"})
const access = require("../../config/roles.json");
const userModel = require("../users/user.schema");
const blogsModel = require("./blog.schema");

function getDate(){
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();

    var created = `${month[mm]} ${dd}`
    return created;
}

app.post("/", async (req, res) => {
    let { title, description, short_desc, src} = req.body;
    let token = req.headers.token;

    console.log("hio")

    oper = "C";
    let roles = access.roles;
    try{
        let decoded = jwt.verify(token, process.env.SECRET_PASS);
        let user = await userModel.findOne({_id:decoded.id, email: decoded.email});
        let role = user.role;
        var createdOn = getDate();;
        for(let k of roles){
            let r = k.role;
            let a = k.access;
            if(role ==  r && a.includes(oper)){
                let blog = await blogsModel.create({title, description, short_desc, src, createdOn, user: user.id });
                return res.send({message: true});
            }
        }
        return res.status(401).send({message: "Missing Permissions", writer: false})
    }catch(e){
        res.status(401).send("Operation not allowed");
    }
})

app.get("/:id", async(req,res)=>{
    let id = req.params.id ;
    let blog = await blogsModel.findById({_id : id}).populate("user", {"password" : 0});
    res.send(blog);
})


app.get("/", async (req, res) => {
    let blogs = await blogsModel.find().populate("user", {"password" : 0});
    res.send(blogs);
})


module.exports = app;