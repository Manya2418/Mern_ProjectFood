import express from 'express';
import cors from 'cors';
import dbconnection from './DbConnection/DbConnect.js';
import router from './Routes/RestaurantRoute.js';
import menuRouter from  './Routes/MenuRoute.js';
import bodyParser from 'body-parser';
import userRouter from './Routes/userRoute.js';
import cartRouter from './Routes/cartRoutes.js';
import orderRouter from './Routes/orderRoute.js';
import adminRouter from './Routes/AdminRoute.js'
import dotenv from 'dotenv'
const app=express();
app.use(bodyParser.json())
const port=4000;
dotenv.config();
app.use(cors());
app.use(express.json())
dbconnection();

app.use('/restaurant',router)
app.use('/menus',menuRouter)
app.use('/user',userRouter);
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/admin',adminRouter)



app.post('/', (req, res) => {
  const { address } = req.body;
  console.log('Received address:', address);
  
  res.status(200).send('Address received successfully');
});

app.listen(port, (req,res) => {
    console.log(`Server running at http://localhost:${port}/`);
  });


app.post('/api/location', async (req, res) => {
  const { latitude, longitude, userId } = req.body;
  console.log('User location received:', { latitude, longitude });

  try {
    await User.findByIdAndUpdate(userId, {
      location: {
        lat: latitude,
        lng: longitude
      }
    });
    res.json({ message: 'Location saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save location' });
  }
});
