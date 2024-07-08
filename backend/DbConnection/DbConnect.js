import mongoose from "mongoose";
const dbconnection=mongoose.connect('mongodb+srv://manyasahu:Manya123@cluster0.zgfhul6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected")
}).catch("not connected")

export default dbconnection;


