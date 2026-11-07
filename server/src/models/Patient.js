import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
  patientId:{type:String,unique:true,index:true}, name:String, email:{type:String,unique:true},
  phone:String, age:Number, gender:String, bloodGroup:String, address:String,
  allergies:[String], medicalNotes:String, status:{type:String,default:'Active'}, avatar:String
},{timestamps:true});
export default mongoose.model('Patient',patientSchema);
