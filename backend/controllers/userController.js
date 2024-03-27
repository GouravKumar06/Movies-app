import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";


export const createUser = async(req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists please login"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        
        const token =generateToken(newUser._id, res);

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            id: newUser._id,
            name: newUser.username,
            email: newUser.email,
            password: newUser.password,
            token: token
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while creating user"
        });
    }
}


export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "please signup first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const token =generateToken(user._id, res);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            id: user._id,
            name: user.username,
            email: user.email,
            password: user.password,
            token: token
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while login user"
        });
    }
}


export const logout = async(req, res) =>{
    try{
        res.cookie("moviesToken",null,{
            httpOnly: true,
            expires: new Date(Date.now()),
        })

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while logout user"
        });
    }
}



export const getAllUser = async(req, res) =>{
    try{
        const users = await User.find();

        return res.status(200).json({
            success: true,
            users
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while getting all user"
        });
    }
}


export const getCurrentUser = async(req, res) =>{
    try{
        const user = await User.findById(req.user.id);

        return res.status(200).json({
            success: true,
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while getting current user"
        });
    }
}


export const updateUser = async(req, res) =>{
    try{
        const {email} = req.body;

        const {username,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
            });
        }

        const existUser = await User.findOne({email}).select("+password");
        console.log("existUser",existUser);
        if(!existUser){
            return res.status(400).json({
                success: false,
                message: "User not found please provide correct email"
            }); 
        }

        delete existUser.password;

        const user = await User.findOneAndUpdate({email},{
            $set:{
                email:email,
                username:req.body.username,
                password: await bcrypt.hash(req.body.password, 10)
            }
        });

        console.log("user",user);

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error while updating user"
        });
    }
}