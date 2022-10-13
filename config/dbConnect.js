require("dotenv").config({path: __dirname+"/config.env"})
const mongoose = require("mongoose");

const dbConnect = ()=>{
    return mongoose.connect(`mongodb+srv://admin:authorlokesh@bloggingdatabase.bfep84o.mongodb.net/blogger`)

}

module.exports = dbConnect;