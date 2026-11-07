import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/Doctor.js';
import Patient from './models/Patient.js';
import Appointment from './models/Appointment.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
dotenv.config();
const first=['Aarav','Vivaan','Aditya','Ishita','Ananya','Diya','Kabir','Meera','Arjun','Saanvi','Reyansh','Aadhya','Rohan','Priya','Kunal','Nisha','Dev','Kavya','Rahul','Sara'];
const last=['Sharma','Verma','Singh','Kumar','Gupta','Mishra','Das','Jha','Roy','Sinha','Yadav','Mehta','Patel','Rao','Malhotra','Anand'];
const departments=['Cardiology','Neurology','Orthopedics','Paediatrics','Dermatology','General Medicine','Gynaecology','ENT','Ophthalmology','Urology','Oncology','Psychiatry','Radiology','Gastroenterology','Dentistry','Pulmonology','Nephrology','Endocrinology','Emergency','Physiotherapy'];
const qualifications=['MBBS, MD','MBBS, MS','MBBS, DNB','BDS, MDS','MBBS, DM','MBBS, Diploma'];
const pick=a=>a[Math.floor(Math.random()*a.length)];
const phone=()=>`9${String(Math.floor(100000000+Math.random()*899999999))}`;
const slug=s=>s.toLowerCase().replace(/[^a-z]+/g,'.');
await mongoose.connect(process.env.MONGODB_URI);
try{
 await Promise.all([Doctor.deleteMany({}),Patient.deleteMany({}),Appointment.deleteMany({}),User.deleteMany({})]);
 const doctors=Array.from({length:500},(_,i)=>{
  const name=`Dr. ${pick(first)} ${pick(last)}`,dep=departments[i%departments.length];
  return {doctorId:`AC-DOC-${String(i+1).padStart(4,'0')}`,name,email:`doctor${i+1}@adityacare.demo`,phone:phone(),department:dep,specialization:dep,qualification:pick(qualifications),experience:2+(i%29),consultationFee:400+(i%8)*150,availability:['Mon','Tue','Wed','Thu','Fri','Sat'].slice(0,3+(i%4)),status:'Active',avatar:`https://i.pravatar.cc/120?img=${(i%70)+1}`,bio:`Experienced ${dep.toLowerCase()} specialist providing patient-focused care.`};
 });
 const patients=Array.from({length:500},(_,i)=>{
  const name=`${pick(first)} ${pick(last)}`;
  return {patientId:`AC-PAT-${String(i+1).padStart(4,'0')}`,name,email:`patient${i+1}@adityacare.demo`,phone:phone(),age:1+(i%89),gender:i%2?'Female':'Male',bloodGroup:['A+','A-','B+','B-','AB+','AB-','O+','O-'][i%8],address:`${10+i} ${pick(['Park Road','Station Road','Gandhi Path','Lake View Road','Civil Lines'])}, Patna, Bihar`,allergies:i%9===0?['Penicillin']:[],medicalNotes:'Fictional demo record — not for clinical use.',status:'Active',avatar:`https://i.pravatar.cc/120?img=${((i+25)%70)+1}`};
 });
 const savedDoctors=await Doctor.insertMany(doctors),savedPatients=await Patient.insertMany(patients);
 const doctorPassword=await bcrypt.hash('Doctor@2026',10);
 await User.insertMany(savedDoctors.map(d=>({name:d.name,email:d.email,passwordHash:doctorPassword,role:'doctor',doctor:d._id})));
 const appointments=Array.from({length:1200},(_,i)=>({appointmentId:`AC-APT-${String(i+1).padStart(5,'0')}`,doctor:savedDoctors[i%500]._id,patient:savedPatients[(i*7)%500]._id,date:new Date(Date.now()+((i%30)-15)*86400000),time:['09:00 AM','10:30 AM','12:00 PM','02:00 PM','04:30 PM'][i%5],reason:['General consultation','Follow-up visit','Routine check-up','Specialist consultation'][i%4],status:['Approved','Completed','Pending','Cancelled'][i%4]}));
 await Appointment.insertMany(appointments);
 console.log('Seed complete: 500 doctors, 500 patients, 1,200 demo appointments and 500 doctor demo logins.');
}finally{await mongoose.disconnect();}
