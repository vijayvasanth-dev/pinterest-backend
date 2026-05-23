import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/authmodel.mjs'

export const register = async(req,res)=>{

    try{

    const {name,email,password}=req.body

    //validation
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    //check duplicate

    const existinguser= await User.findOne({email})

    if(existinguser){
        return res.status(400).json({message:"user already exist"})
    }


    //hash password

    const hashedpassword = await bcrypt.hash(password,10)

    //save user

    const newuser= await User.create({
        name,
        email,
        password:hashedpassword
    })


    const token = jwt.sign( { id: newuser._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' })

    //send cookies

    res.cookie('token',token,{
        httponly:true,
        samesite:'Lax',
        maxAge: 2 * 60 * 60 * 1000,

    })

    //send json

    res.status(201).json({
        message:"user succesfully created",
        user:{
        id:newuser._id,
        name:newuser.name,
        email:newuser.email,
      
        }

    })

}

catch(error){
    res.status(500).json({message:"internal server error"})
    console.error(error)
}


}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate fields
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      // Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      // set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure:false,
        maxAge: 2 * 60 * 60 * 1000,
      });
  
      // Send response
      return res.status(200).json({
        message: 'User login successfully.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
        
      });
  
    } catch (error) {
      console.error('Login error:', error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  //logout
  
  export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false  // change to true in production
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

 //get current user

export const getuser = async (req,res)=>{

    try{
    
    const user = await User.findById(req.userId).select('-password')
    
    if(!user){
        return res.status(400).json({message:"user not found"})
    }           
    
    res.json({user})
}       
   
    catch(error){
    console.error("Get user error:", error.message)
    res.status(500).json({message:"server error"})

 }
}  