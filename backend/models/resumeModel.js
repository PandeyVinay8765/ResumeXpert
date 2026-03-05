import mongoose from  "mongoose"
const ResumeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    title:{
        type:String,
        required:true,

    },
    thumbnail:{
        type:String,

    },
    template:{
        type:String,
        colorPalette:[String],
    },
    profileInfo:{
        ProfilePreview:String,
        fullName:String,
        designation:String,
        summary:String
    },
    contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedIn:String,
        github:String,
        website:String,
    }
})