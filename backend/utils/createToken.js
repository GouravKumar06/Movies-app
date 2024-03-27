import jwt from "jsonwebtoken"


const generateToken = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"})

    //set http-only cookie
    res.cookie("moviesToken",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:30 * 24 * 60 * 60 * 1000
    })

    return token
}


export default generateToken;