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
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
      },
      location: {
        type: String,  
        required: false
      }
    
})

const Fooditem=mongoose.model('FoodItem',FoodItemSchema);
export default Fooditem;