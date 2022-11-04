const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title : String,
    short_desc: String,
    description : String,
    likes : {type : Number, default : 0},
    comments : Array,
    src : String,
    createdOn : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref:"user"}
})


const blogsModel = mongoose.model("blog",blogsSchema)

module.exports = blogsModel;