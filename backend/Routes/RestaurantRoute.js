import express from 'express';
import Fooditem  from '../model/RestaurantSchema.js';


const router=express.Router();
router.get('/',async(req,res)=>{
    try{
        const fooditems=await Fooditem.find();
        res.json(fooditems);
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
      const restaurant = await Fooditem.findById(req.params.id);
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default router;