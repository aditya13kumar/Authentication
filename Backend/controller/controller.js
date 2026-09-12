import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export async function registeruser(req,res) {
    const {username , email , passward} = req.body;

    const isAlreadyexist=await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isAlreadyexist){
        return res.status(409).json({message:"user allready exists"})
    }
    const hashpassward = await bcrypt.hash(passward,10);

    const user =await usermodel.create({
        username,
        email,
        passward:hashpassward
    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })


        {message:"user registersuccessfully"},
        user
    )
        return res.status(201).json({message:"user not found"})
    }
    

    res.status(200).json({
        message:"user get successfully",
        user:{
            username:user.username,
            email:user.email
        }
    })
}

