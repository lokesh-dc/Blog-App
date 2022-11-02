const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verified : {type: Boolean, default : false},
    role : {type: String, enum:["Reader", "Writer", "Admin"], default: "Reader"}
})


const userModel = mongoose.model("user",userSchema)

module.exports = userModel;