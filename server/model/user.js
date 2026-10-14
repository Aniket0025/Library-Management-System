const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
            trim:true,
        },
        email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password: {
            type:String,
            require:true,
            select:false,
        },
        role:{
            type:String,
            enum: ["admin", "student"],
            default:"student",
        },
        studentId:{
            type:String,
            unique:true,
            sparse:true,
        },
        department:{
            type:Boolean,
            default:true,
        },
    },
    {timestamps:true}
);

model.export = mongoose.model("User", userSchema);