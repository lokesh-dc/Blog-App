const express = require('express');
const http = require("http")
const { connect } = require('http2');
const socketIo = require('socket.io')
const cors = require("cors");


const dbConnect = require('./config/dbConnect');
require("dotenv").config({path: __dirname+"/config.env"})


const usersRouter = require("./features/users/users.router");
const blogsRouter = require("./features/blogs/blogs.router");


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


    socket.on("comment", (data)=>{
        console.log(data)
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