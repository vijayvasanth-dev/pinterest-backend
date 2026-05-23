import mongoose from 'mongoose'

const authschema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        unique:true
    }
})

const User = mongoose.model("User",authschema)

export default User

