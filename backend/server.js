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
import Stripe from 'stripe';
const app=express();
app.use(bodyParser.json())
const port=5000;
dotenv.config();
app.use(cors());
app.use(express.json())
dbconnection;
const stripe=Stripe("sk_test_51NmBxVSJm0EOvE96GfRtoViGGWb838JUFEP8lJgK2ekvKVL496R9kwU9m8wlh08kpI7WLtGHnXlknboJ8SjwVOqW00j5qYKm7G")
app.use('/restaurant',restaurantRouter)
app.use('/menus',menuRouter)
app.use('/user',userRouter);
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/admin',adminRouter) 

app.post('/payment/charge', async (req, res) => {
  const { amount, paymentMethodId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      payment_method: paymentMethodId,
      confirm: true,
    });
    console.log('Payment Intent:', paymentIntent);
    res.status(200).json({ message: 'Payment successful!', paymentIntent });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, (req,res) => {
    console.log(`Server running at http://localhost:${port}/`);
  });