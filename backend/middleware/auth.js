import User from '../models/Usermodel.js'
import jwt  from 'jsonwebtoken'
export const protect(req,res,next)=>{
    try{
        let token=req.header.authorization;
        if(token && token.startsWith('Bearer')){
            token.split(" ")[1];
            const decoded=jwt
        }

    }
}