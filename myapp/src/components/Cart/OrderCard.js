import React, { useState } from 'react';
import './Order.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
const OrderCard = ({ order ,onRemove}) => {
  const [loading,setLoading]=useState();

    const handleRemoveOrder = async () => {
      setLoading(true)
      try {
        await axios.delete(`https://mernbackend-1-9ihi.onrender.com/order/delete?id=${order._id}`);
        onRemove(order._id);
        toast.success("Removed successful!")
        window.location.reload();
      } catch (error) {
        console.error('Error removing order:', error);
      }finally{
        setLoading(false)
      }
    };
    
    if(loading){
      return <Loader/>
    }
  return (
    <>
      <div className="order-card">
     
         <div class="flex justify-between">
         <h1>Ordered by:{order.userName}</h1>
         <button className='btn-add' style={{width:"auto"}} onClick={handleRemoveOrder}>Remove Order</button></div>
        
         <h1>Restaurant: {order.restaurantName}</h1>
        <h2>Total Price: {order.totalPrice}</h2>
        <p>Discounted Price: {order.discountedPrice}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>

        <div className='order-menu'>
          {order.items.map(item => (
            <div key={item.name} class=" w-36">
               <img src={item.imageUrl} alt={item.name} className="item-image" />
              
              <p >Name: {item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default OrderCard;
