const mongoose = require("mongoose");

const readLaterSchema = new mongoose.Schema({
    blog : {type: mongoose.Schema.Types.ObjectId, ref:"blog"},
    user : {type: mongoose.Schema.Types.ObjectId, ref:"user"}
})


const bookMarks = mongoose.model("readLater",readLaterSchema)

module.exports = bookMarks;