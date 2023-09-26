import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    companyName:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
   photo:{
    data:Buffer,
    contentType:String
    },
},{timestamps:true})
export default mongoose.model('users',userSchema)