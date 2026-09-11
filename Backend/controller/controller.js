import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";

async function registeruser() {
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

    const user = usermodel.create({
        username,
        email,
        passward:hashpassward
    })

    res.status(201).json(
        {message:"user registersuccessfully"},
        user
    )
}

export default registeruser;