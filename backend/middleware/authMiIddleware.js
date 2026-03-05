import User from '../models/Usermodel.js'
import jwt  from 'jsonwebtoken'
export const protect=async(req,res,next)=>{
    try{
        let token=req.header.authorization;
        if(token && token.startsWith('Bearer')){
            token.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findByID(decoded.id).select('password')
            next();
        }
        else{
            res.status(401).json({message:'Not authorized:)'})
        }

    }catch(error){
        res.status(401).json({message:'Token Failed',
            error:error.message
        })
    }
}