
import mongoose from "mongoose"

const PinSchema = new  mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },

    likes:{
        type:Number,
        default:0
    },

    comment:[{
        text:String,
        date:{
            type:Date,
            default:Date.now()
        }
    }]
})

const Pin = mongoose.model("Pin",PinSchema)

export default Pin