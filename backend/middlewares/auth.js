import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();
export const authenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.moviesToken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "please login first"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthenticated user"
        })
    }
}


export const isAdmin = (req,res,next) =>{
  
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.status(401).json({
            success: false,
            message: "You are not an admin"
        })
    }
   
}