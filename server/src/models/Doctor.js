import mongoose from 'mongoose';
const doctorSchema = new mongoose.Schema({
  doctorId:{type:String,unique:true,index:true}, name:String, email:{type:String,unique:true},
  phone:String, department:String, specialization:String, qualification:String,
  experience:Number, consultationFee:Number, availability:[String], status:{type:String,default:'Active'},
  avatar:String, bio:String
},{timestamps:true});
export default mongoose.model('Doctor',doctorSchema);
