const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture:{
        type:String,
        required:true,
        unique:true
    },
    cv:{
        type:String,
        required:true,
        unique:true
    }

},{timestamps:true})
const User = mongoose.model('User',UserSchema)
module.exports = User