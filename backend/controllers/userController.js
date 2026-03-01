import User from "../models/Usermodel.js";
import bcrypt from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'})
}


export const registerUser=async()=>{
    try{
        const {name,email,password}=req.body;
        const UserExist=await User.findOne({email})
        if(UserExist){
            return res.status(400).json({message:"User Already Exist"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Password Below 8 Character"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const user=await User.create({name,email,password:hashedpassword})
        res.status(201).json({_id:user._id,name:user.name,email:user.email,
            token:generateToken(user._id)
        })

    }catch(error){
        res.status(500).json({message:"Server Error :("})
        error:error.message
    }
}
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const  user=await findOne({email})
        if(!user){
           return res.status(500).json({message:"User Not exist"})
            
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).json({message:"Password is incorrect Retry :("})
            res.status(201).json({_id:user._id,name:user.name,email:user.email,
            token:generateToken(user._id)
        })
        }
    } catch (error){
        res.status(500).json({message:"Server Error :("})
        error:error.message
    }
}

//getuser
export const getuserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('password')
        if(!user){
            res.status(404).json({message:"User Not Found :("});

        }
        res.json(user)
    }catch(error){
         res.status(500).json({message:"Server Error :("})
        error:error.message
    }
}