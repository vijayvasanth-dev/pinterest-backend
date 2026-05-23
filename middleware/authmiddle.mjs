import jwt from 'jsonwebtoken'


const protect = (req,res,next)=>{

    try{

        //read token from cookie
    const token = req.cookies?.token

    if(!token){
       return  res.status(401).json({message:"Not authorized.No token"})
    }

    //verify token

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    //attach userid to request

    req.userId = decoded.id;

    //move to next (controller)

    next()

    }
    catch(error){
        console.error("Auth middleware error",error.message)
        return res.status(401).json({message:"Not authorized.invalid token"})

    }

}

export default  protect