import fs from 'fs'
import path from 'path'
import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'
import { profile, profileEnd } from 'console'
export const uploadResumeImages = async (req, res) => {
    try {
        upload.fields([{ name: "thumbnail" }, { name: "ProfileImage" }])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "File upload failed", error: err.message })
            }
            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id })
            if (!resume) {
                return res.status(404).json({ message: "resume not Found" })
            }
            const uploadsFolder = path.join(process.cwd(), 'uploads')
            const baseurl = `${req.protocol}://${req.get("host")}`;

            const newThumbail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.ProfileImage?.[0];
            if (newThumbail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
                }
                if (fs.existsSync(oldThumbnail)) {
                    fs.unlinkSync(oldThumbnail)
                }
                resume.thumbnail = `${baseurl}/uploads/${newThumbail.filename}`;
            }

            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl))
                }
                if (fs.existsSync(oldProfile)) {
                    fs.unlinkSync(oldProfile)
                }
                resume.profileInfo.profilePreviewUrl = `${baseurl}/uploads/${newProfileImage.filename}`;
            }
            await resume.save();
            res.status(200).json({ message: "Image Uploded Successfully", thumbnailLink: resume.thumbnailLink, profilePreviewUrl: resume.profileInfo.profilePreviewUrl })
        })
    } catch (err) {
        console.error("error Uploading Image", err);
        res.status(500).json({ message: "Failed to upload Images" ,error:err.message})
    }
}