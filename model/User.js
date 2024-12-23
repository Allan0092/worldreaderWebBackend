const mongoose=require("mongoose");

const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    profile_picture:{
        type:Image
    },
    


})
