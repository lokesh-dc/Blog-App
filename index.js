const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require('./config/dbConnect');
require("dotenv").config({path: __dirname+"/config.env"})
const usersRouter = require("./features/users/users.router");
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use("/users", usersRouter)
app.get('/', (req, res) => res.send('hello'))



app.listen(process.env.PORT, async () => {
    await dbConnect();
    console.log(`server started on port ${process.env.PORT}`)
})