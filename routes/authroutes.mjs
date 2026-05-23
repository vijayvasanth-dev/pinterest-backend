import express from 'express'
import { getuser, login, logout, register } from '../controller/authcontroller.mjs'
import protect from '../middleware/authmiddle.mjs'

const authroutes = express.Router()

authroutes.post('/api/register',register)
authroutes.post('/api/login',login)
authroutes.get("/api/user",protect,getuser)

authroutes.post('/api/logout', logout);



export default authroutes

