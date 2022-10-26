const express = require('express');
const http = require("http")
const { connect } = require('http2');
const socketIo = require('socket.io')
const cors = require("cors");


const dbConnect = require('./config/dbConnect');
require("dotenv").config({path: __dirname+"/config.env"})


const usersRouter = require("./features/users/users.router");
const blogsRouter = require("./features/blogs/blogs.router");
const blogsModel = require("./features/blogs/blog.schema");


const app = express()
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


io.on("connection", (socket) => {
    console.log("new user", socket.id);

    socket.on("comment", async ({id,message})=>{
        let blog = await blogsModel.findById({_id:id});
        let blogComments = blog.comments;
        blogComments.push(message);
        await blogsModel.findByIdAndUpdate({_id: id}, {comments : blogComments })

        socket.emit("blogComments", {id, blogComments} );
    })
})


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/users", usersRouter)
app.use("/blogs", blogsRouter);
app.get('/', (req, res) => res.send('hello'))



server.listen(process.env.PORT, async () => {
    await dbConnect();
    console.log(`server started on port ${process.env.PORT}`)
})