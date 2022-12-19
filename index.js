const express = require('express');
const http = require("http")
const { connect } = require('http2');
const socketIo = require('socket.io')
const cors = require("cors");
const jwt = require('jsonwebtoken');

const dbConnect = require('./config/dbConnect');
require("dotenv").config({path: __dirname+"/config.env"})


const usersRouter = require("./features/users/users.router");
const blogsRouter = require("./features/blogs/blogs.router");
const blogsModel = require("./features/blogs/blog.schema");
const savedRouter = require("./features/readLater/readLater.router");

const app = express()
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://idyllic-concha-85c2f8.netlify.app/"
    }
});


io.on("connection", (socket) => {
    console.log("new user", socket.id);

    socket.on("comment", async ({id,message})=>{
        let blog = await blogsModel.findById({_id:id});
        let blogComments = blog.comments;
        blogComments.push(message);
        await blogsModel.findByIdAndUpdate({_id: id}, {comments : blogComments })

        io.emit("blogComments", {id, blogComments} );
    })

    socket.on("liked", async({id})=>{
        let blog = await blogsModel.findById({_id:id});
        let likes = blog.likes;
        likes += 1;
        await blogsModel.findByIdAndUpdate({_id: id}, {likes: likes })

        io.emit("liked", {id, likes});
    })
})


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/users", usersRouter)
app.use("/blogs", blogsRouter);
app.use("/saved", savedRouter)
app.get('/', (req, res) => res.send('hello'))

app.get("/stories", async (req, res)=>{
    let token = req.headers.token;
    if(token){
        try{
            let {id} = jwt.verify(token, process.env.SECRET_PASS);
            let blogs = await blogsModel.find({user: id});
            res.send(blogs);
        }catch(e){
            res.status(404).send("Not found");
        }
    }else{
        res.status(401).send("Token required");
    }
})

server.listen(process.env.PORT, async () => {
    await dbConnect();
    console.log(`server started on port ${process.env.PORT}`)
})
