import jwt from "jsonwebtoken";

export const verifytoken = (req,res)=>{
    const authheader = req.headers.authorization;
    if(!authheader){
        return res.status(401).json({message:"No token provided"});
    }
    const token = authheader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.status(403).json({message:"invalid token"});
        }
        req.user = user;
        next();
    })
}

export const verifyrole = (role)=>{
    return (req,res,next)=>{
        const userrole = req.user?.role;
        if(userrole !== role){
            return res.status(403).json({message:"Access denid"});
        }
        next();
    }
}