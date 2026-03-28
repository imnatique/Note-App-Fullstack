import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
},{timestamps:true})

const userModel = mongoose.model("Users", userSchema)

export default userModel