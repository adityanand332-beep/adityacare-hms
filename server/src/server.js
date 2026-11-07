import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
dotenv.config();
const app=express();
app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));
app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'AdityaCare HMS API'}));
app.use('/api/auth',authRoutes);
app.use('/api',dataRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Unexpected server error'});});
const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGODB_URI).then(()=>{
 app.listen(port,()=>console.log(`AdityaCare API running at http://localhost:${port}`));
}).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1);});
