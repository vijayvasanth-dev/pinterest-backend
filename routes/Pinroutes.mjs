import express from 'express'
import { deletePin, getpin, likePin, postPin, putPin } from "../controller/Pincontroller.mjs";
import upload from '../middleware/multer.mjs';
import protect from '../middleware/authmiddle.mjs';


const pinroutes = express.Router()

pinroutes.get('/api/getpin', getpin);
pinroutes.post('/api/postPin', protect, upload.single('image'), postPin);
pinroutes.put('/api/putpin/:id',protect,putPin);
pinroutes.delete('/api/deletepin/:id',protect,deletePin);

pinroutes.put('/api/likepin/:id',protect,likePin);


export default pinroutes





