import mongoose from "mongoose";
const dbconnection=mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected")
}).catch("not connected")

export default dbconnection;
