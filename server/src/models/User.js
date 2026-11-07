import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},passwordHash:{type:String,required:true},role:{type:String,enum:['patient','doctor'],required:true},patient:{type:mongoose.Schema.Types.ObjectId,ref:'Patient',default:null},doctor:{type:mongoose.Schema.Types.ObjectId,ref:'Doctor',default:null}},{timestamps:true});
export default mongoose.model('User',userSchema);
