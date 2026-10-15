import usermodel from '../model/usermodel.js';
import bcrypt from "bcryptjs";


export const register = async (req , res)=>{
    const {username , email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        const existuser =await usermodel.findOne({email});
        
        if( existuser){
            return res.status(400).json({message:"user allready exist!!"})
        }
        const hashpassword= await bcrypt.hash(password,10);
        const user = new user({
            username,
            email,
            password:hashpassword
        })
        await user.save();

        return res.status(400).json({
            message:"user register successfull!!",
            user:{
                user:user._id,
                email,
                username
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"server error"});
    }
}


export const login = async (req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required!1"});
    }

    try {
        
    } catch (error) {
        
    }
}