import mongoose from 'mongoose'

const DB = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is connected")
    }

    catch(error){
        console.error("DB is not connected",error)
    }

}

export default DB

