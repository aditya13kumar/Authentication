import usermodel from '../model/usermodel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req , res)=>{
    console.log("headers", req.headers);
    console.log("body",req.body);
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
        const user = new usermodel({
            username,
            email,
            password:hashpassword
        })
        await user.save();

        return res.status(400).json({
            message:"user register successfull!!",
            user:{
                id:user._id,
                email:user.email,
                username:user.username,
                role:user.role
            }
        })
        
    } catch (error) {
        console.log("register erroer",error);
        return res.status(501).json({message:"server error"});
    }
}


export const login = async (req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required!1"});
    }
    try {
      const user =await usermodel.findOne({email});
      if(!user){
        return res.status(401).json({message:"user not found"});
      }
      const ispasswordtrue = await bcrypt.compare(password,user.password);
      if(!ispasswordtrue){
        return res.status(400).json({message:"password invalid!!"});
      }

      const accesstoken = jwt.sign({
        id:user._id,
        role:user.role
      },process.env.ACCESS_TOKEN,{expiresIn:"15m"})

      const refreshtoken = jwt.sign({
        id:user._id,
        role:user.role
      },process.env.REFRESH_TOKEN,{expiresIn:"7d"})

      res.cookie("refreshtoken", refreshtoken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict"
      })
      res.status(200).json({
        accesstoken,
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
      })

        
    } catch (error) {
        console.log("login error",error);
        res.status(400).json({message:"server error"});
    }
}

export const refreshtoken = async(req,res) =>{
    const token = req.cookie.refreshtoken;

    if(!token){
        return res.status(201).json({message:"Token unavilable"});
    }
    try {
        const decoded = jwt.verify(token,process.env.REFRESH_TOKEN);
        const user= await user.findById(decoded._id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const newAccessToken = jwt.sign(
            {id:user._id,role:user.role},
            process.env.ACCESS_TOKEN,
            {expiresIn:"15m"}
        )
        res.status(201).json({
            accesstoken:newAccessToken,
        })
    } catch (error) {
        console.log("refresh token error",error);
        res.status(500).json({message:"server error"});
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        });
        res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        console.log("log out server error",error);
        res.status(500).json({message:"server error"});
    }
}

