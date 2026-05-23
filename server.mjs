import dotenv from 'dotenv';
dotenv.config()

import express from 'express'
import DB from './DB_connect/Db.mjs'
import authroutes from './routes/authroutes.mjs'
import pinroutes from './routes/Pinroutes.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true                
}));

app.use(express.json());;
app.use(cookieParser());
app.use(authroutes);
app.use(pinroutes);
DB()


const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

