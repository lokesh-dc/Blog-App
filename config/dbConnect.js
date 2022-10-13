require("dotenv").config({path: __dirname+"/config.env"})
const mongoose = require("mongoose");

const dbConnect = ()=>{
    return mongoose.connect(`${process.env.MONGO_URI}`)

}

module.exports = dbConnect;