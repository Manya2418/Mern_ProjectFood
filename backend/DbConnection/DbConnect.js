import mongoose from "mongoose";
const dbconnection=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected");
    }catch(err){
        console.log("Not connected",err);
    }
}
export default dbconnection;


