const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title : String,
    description : String,
    likes : {type : Number, default : 0},
    comments : Array
})


const blogsModel = mongoose.model("blogs",blogsSchema)

module.exports = blogsModel;