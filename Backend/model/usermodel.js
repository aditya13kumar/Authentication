import mongoose from "mongoose";


    const UserSchema = new mongoose.Schema({
        username:{
            type:String,
            required:[true,"username is required"],
            unique:[true,"username allready exists"]
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:[true,"email allready exists"]
        },
        passward:{
            type:String,
            required:[true,"passward is required"],
        },
    },{timestamps:true})


const usermodel = mongoose.model("user",UserSchema);

export default usermodel;