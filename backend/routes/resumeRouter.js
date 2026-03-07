import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { CreateResume, deleteResume, getuserById, getUserResume, updateResume } from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';
const resumeRouter=express.Router();
resumeRouter.post('/',protect,CreateResume)
resumeRouter.get('/',protect,getUserResume)
resumeRouter.get('/:id',protect,getuserById)
resumeRouter.put('/:id',protect,updateResume)
resumeRouter.put('/:id/upload-images',protect,uploadResumeImages)
resumeRouter.delete('/:id',protect,deleteResume)
export default resumeRouter;