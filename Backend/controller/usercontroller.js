import usermodel from "../model/usermodel.js";

export const getuser = async(req , res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit)|| 10;
        const skip = (page - 1)* limit ;

        const total = await usermodel.countDocuments();
        const users = await usermodel.find().skip(skip).limit(limit).select("-password");
        res.status(200).json({
            users,total, totalPages:Math.ceil(total / limit),currentPage:page 
        })
    } catch (error) {
        console.log("get user server error", error);
        return res.status(500).json({message:"server error"});
    }
}

export const deleteuser = async (req , res)=>{
    try {
        const user = await usermodel.findByIdAndDelete(usermodel.params.id);
        if(!user){
            return res.status(404).json({message:"user not found!!"});
        }
        res.status(200).json({message:"user deleted seccessfully!!"});
    } catch (error) {
        console.log("error deleting user;",error);
        return res.status(500).json({message:"server error"});
    }
}


export const getprofile = async(req,res)=>{
    try {
        const user = await usermodel.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("profile error",error);
        return res.status(500).json({message:"server error"});
    }
}