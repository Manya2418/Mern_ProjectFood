import express from 'express';
import cors from 'cors';
import dbconnection from './DbConnection/DbConnect.js';
import restaurantRouter from './Routes/RestaurantRoute.js';
import menuRouter from  './Routes/MenuRoute.js';
import bodyParser from 'body-parser';
import userRouter from './Routes/userRoute.js';
import cartRouter from './Routes/cartRoutes.js';
import orderRouter from './Routes/orderRoute.js';
import adminRouter from './Routes/AdminRoute.js'
import dotenv from 'dotenv'
const app=express();
app.use(bodyParser.json())
const port=5000;
dotenv.config();
app.use(cors());
app.use(express.json())
dbconnection;
app.use('/restaurant',restaurantRouter)
app.use('/menus',menuRouter)
app.use('/user',userRouter);
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/admin',adminRouter) 


app.listen(port, (req,res) => {
    console.log(`Server running at http://localhost:${port}/`);
  });