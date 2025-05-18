// import express from 'express';
// import Fooditem  from '../model/RestaurantSchema.js';


// const router=express.Router();
// router.get('/',async(req,res)=>{
//     try{
//         const fooditems=await Fooditem.find();
//         res.json(fooditems);
//     }catch(err){
//         res.status(500).json({message:err.message})
//     }
// })

// router.get('/:id', async (req, res) => {
//     try {
//       const restaurant = await Fooditem.findById(req.params.id);
//       res.json(restaurant);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  

// export default router;


import express from 'express';
import FoodItem from '../model/RestaurantSchema.js'; // Import the Restaurant Schema
import { verifyAdmin } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.get('/res', async (req, res) => {
  try {
    const adminId = req.query.adminId;
    if (!adminId) {
      return res.status(400).json({ error: 'Admin ID is required' });
    }

    const foodItems = await FoodItem.find({ adminId });

    if (foodItems.length > 0) {
      return res.json(foodItems);
    } else {
      return res.status(404).json({ message: 'No food items found for this admin' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, description, imageUrl,location } = req.body;
    const adminId = req.admin.id;  
    const newFoodItem = new FoodItem({
      name,
      description,
      imageUrl,
      adminId,
      location
      
    });
    
    await newFoodItem.save();

    res.status(201).json({ message: 'Restaurant added successfully!', foodItem: newFoodItem });
  } catch (err) {
    console.error('Error adding restaurant:', err);
    res.status(500).json({ message: 'Error adding restaurant. Please try again.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await FoodItem.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// router.get('/restaurants', async (req, res) => {
//   console.log("Hiet")
//   const { adminId } = req.query;

//   console.log(adminId)

  
  
//   if (!adminId || !mongoose.Types.ObjectId.isValid(adminId)) {
//     return res.status(400).json({ message: 'Invalid or missing adminId' });
//   }

//   try {
//     const restaurants = await FoodItem.find({ adminId });
//     res.status(200).json(restaurants);
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//     res.status(500).json({ message: 'Failed to fetch restaurants' });
//   }
// });

export default router;
