import mongoose from "mongoose";
const dbconnection=async ()=>{
    try{
        await mongoose.connect('mongodb+srv://manyasahu:Manya123@cluster0.zgfhul6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected");
    }catch(err){
        console.log("Not connected",err);
    }
}
export default dbconnection;


