import jwt from 'jsonwebtoken'

const auth = async(req,res,next)=>{
    const token = req.headers.authorization;

    try {
        jwt.verify(token,process.env.JWT_TOKEN)
        next()
    } catch (error) {
        res.json({success:false,message:"Inavalid Token"})
    }
} 

export default auth;