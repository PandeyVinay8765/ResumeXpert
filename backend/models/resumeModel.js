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
    },
    workExperience:[{
        company:String,
        role:String,
        startDate:String,
        endDate:String,
        description:String}
    ],
    education:[{
        degree:String,
        institution:String,
        startDate:String,
        endDate:String,}

    ],
    skills:[{
        name:String,
        progress:Number}
    ],
    projects:[{
        title:String,
        description:String,
        github:String,
        liveDemo:String,}

    ],
    certification:[{
        title:String,
        issue:String,
        year:String,}
    ],
    languages:[{
        name:String,
        progress:Number,
    }],
    interests:[String]

},{
    timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}
});
export default mongoose.model('Resume',ResumeSchema);