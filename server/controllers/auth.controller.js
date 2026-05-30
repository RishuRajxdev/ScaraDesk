import User from "../models/user.model";
import { genToken } from "../config/token";

export const googleAuth = async(req,res)=>{
    try {
        const {name,email}= req.body;
        if(!name||!email){
            return res.status(400).json({message:"Name and Email are required"})
        }
        let user = await User.findOne({email})
        if(!user){
            user = await user.create({name,email})
        }
        const token = await genToken(user._Id)
        res.cookie("token",token)
    } catch (error) {
        
    }
}