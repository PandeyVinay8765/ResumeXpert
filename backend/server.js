import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/UserRoutes.js';


const app=express()
const PORT=4000;
app.use(cors())
connectDB();

app.use(express.json());
app.use('/api/auth',userRouter)

app.get('/',(req,res)=>{
    res.send('Api working on brave')
})
app.listen(PORT,()=>{
    console.log('server started',PORT);
})