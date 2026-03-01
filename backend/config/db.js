import mongoose from 'mongoose'
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://pandeyjivinay8765_db_user:resume123@cluster0.ftwmmd1.mongodb.net/ResumeXpert')
    .then(()=>console.log("DB CONNECTED :)"))

}