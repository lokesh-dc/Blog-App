const express = require("express");
const app = express.Router();

const access = require("../../config/roles.json");
const blogsModel = require("./blog.schema");


app.post("/", async (req, res) => {
    let { title, description, role, oper} = req.body;
    let roles = access.roles;
    for(let k of roles){
        let r = k.role;
        let a = k.access;
        if(role ==  r && a.includes(oper)){
            let blog = await blogsModel.create({title, description});
            return res.send(blog);
        }
    }
    res.status(401).send("Operation not allowed");
})

app.post("/like/:id", async(req,res)=>{
    let id = req.params.id;
    let blog = await blogsModel.findById({_id : id});
    let likeBlog = await blogsModel.findByIdAndUpdate({_id : id},{likes : blog.likes + 1})
    res.send(likeBlog);
})





app.get("/", async (req, res) => {
    let blogs = await blogsModel.find();
    res.send(blogs);
})

module.exports = app;