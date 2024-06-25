
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from './OrderCard';
import './Order.css'
import { Link, useNavigate } from 'react-router-dom';
import { initializeAuth, logout } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

function OrderList() {
  const [order, setorder] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  
  useEffect(() => {
    const fetchorders=async()=>{
      
      const userdata = JSON.parse(sessionStorage.getItem('userData'));
      const token=userdata.token;
      const userId=userdata.user.id;
      if(!token){
        toast.error("No authorized user found")
        navigate('/user/login')
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/order/orderdetails?userId=${userId}`,userId)

        setorder(response.data);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchorders();

    }
    , [navigate]);





  const handleLogout = () => {
    sessionStorage.clear();  
    dispatch(logout());
    toast.success("Logged Out Successfully!")

    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleRemoveOrder = async (orderId) => {
    try {
      await axios.delete(`https://mernbackend-2-ebc9.onrender.com/order/delete?id=${orderId}`);
      setorder(order.filter(order => order._id !== orderId)); 
      window.location.reload();
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  return (
    <>
    <div className="main-order">
        <div className="order1">
            <h1><Link to="/user/welcome">
                Home
            </Link></h1>
            
            <h1><Link to="/user/profile" >
                User Profile
            </Link></h1>
            <h1><Link to="/order/orderdetails">
                All Orders
            </Link></h1>
            <h1><Link to='/'>
            Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
    <div className='order2'>
      <h1 class="text-orange-500 font-bold text-xl">Order Details</h1>
    
    <div className="restaurant-list">
    
      
       {order.map(order => (
          <OrderCard key={order._id} order={order} onRemove={handleRemoveOrder}/>
        ))}
    </div>
    </div>
    </div>
    <Toaster/>
    </>
  );
}

export default OrderList;
