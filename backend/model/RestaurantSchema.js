import mongoose from "mongoose";

const FoodItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    views:{
        type:Number,
        default:0,
    }
    
})

const Fooditem=mongoose.model('FoodItem',FoodItemSchema);
export default Fooditem;