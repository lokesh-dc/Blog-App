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

    var created = `${dd} ${month[mm]}`
    return created;
}

app.post("/", async (req, res) => {
    let { title, description, short_desc, src, token} = req.body;
    oper = "C";
    let roles = access.roles;
    try{
        let decoded = jwt.verify(token, process.env.SECRET_PASS);
        let user = await userModel.findOne({_id:decoded.id, email: decoded.email},{password:0});
        let role = user.role;

        var createdOn = getDate();;
        for(let k of roles){
            let r = k.role;
            let a = k.access;
            if(role ==  r && a.includes(oper)){
                let blog = await blogsModel.create({title, description, short_desc, src, createdOn, writer: user.id });
                return res.send(blog);
            }
        }
    }catch(e){
        res.status(401).send("Operation not allowed");
    }
})

app.post("/like/:id", async(req,res)=>{
    let id = req.params.id;
    let blog = await blogsModel.findById({_id : id});
    let likeBlog = await blogsModel.findByIdAndUpdate({_id : id},{likes : blog.likes + 1})
    res.send(likeBlog);
})

app.get("/:id", async(req,res)=>{
    let id = req.params.id ;
    let blog = await blogsModel.findById({_id : id});
    res.send(blog);
})


app.get("/", async (req, res) => {
    let blogs = await blogsModel.find();
    res.send(blogs);
})

module.exports = app;