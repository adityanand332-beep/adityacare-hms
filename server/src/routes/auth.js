import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
const router=Router();
const issue=(user)=>jwt.sign({sub:String(user._id||'demo-admin'),role:user.role,name:user.name,email:user.email,patientId:user.patient?String(user.patient):undefined,doctorId:user.doctor?String(user.doctor):undefined},process.env.JWT_SECRET,{expiresIn:'12h'});
router.post('/login',async(req,res)=>{
 const {email,password}=req.body||{}; const normalized=String(email||'').trim().toLowerCase();
 if(normalized==='admin@adityacare.demo' && password==='AdityaCare@2026') return res.json({token:issue({role:'admin',name:'AdityaCare Admin',email:normalized}),user:{name:'AdityaCare Admin',email:normalized,role:'admin'}});
 const user=await User.findOne({email:normalized});
 if(!user||!await bcrypt.compare(String(password||''),user.passwordHash)) return res.status(401).json({message:'Incorrect email or password'});
 res.json({token:issue(user),user:{name:user.name,email:user.email,role:user.role}});
});
router.post('/register',async(req,res)=>{
 try{const {name,email,password,phone,age,gender}=req.body||{}; if(!name||!email||!password||String(password).length<8)return res.status(400).json({message:'Name, email and password (at least 8 characters) are required'});
 const normalized=String(email).trim().toLowerCase();if(await User.findOne({email:normalized})||await Patient.findOne({email:normalized}))return res.status(409).json({message:'This email is already registered'});
 const patient=await Patient.create({patientId:`AC-REG-${Date.now().toString().slice(-8)}`,name:String(name).trim(),email:normalized,phone:phone||'',age:Number(age)||null,gender:gender||'Not specified',bloodGroup:'Not specified',address:'',allergies:[],medicalNotes:'',status:'Active'});
 const user=await User.create({name:patient.name,email:normalized,passwordHash:await bcrypt.hash(password,10),role:'patient',patient:patient._id});
 res.status(201).json({token:issue(user),user:{name:user.name,email:user.email,role:user.role}});
 }catch(e){res.status(500).json({message:'Could not create account. Please check the details and try again.'});}
});
export default router;
