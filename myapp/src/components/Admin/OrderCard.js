
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from './OrderCard';
import './Order.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout, initializeAdmin } from '../../store/adminSlice';
import toast, { Toaster } from 'react-hot-toast';

function OrderList() {
  const [order, setorder] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  
  useEffect(() => {
    const fetchorders=async()=>{
      
      const admindata = JSON.parse(sessionStorage.getItem('Data'));
      const token=admindata.token;
      if(!token){
        toast.error("No authorized user found")
        navigate('/user/login')
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/admin/allorder`)

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
    dispatch(adminlogout());
    toast.success("Logged Out Successfully!")

    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAdmin());
  }, [dispatch]);

  const handleRemoveOrder = async (orderId) => {
    // try {
    //   await axios.delete(`http://localhost:5000/order/delete?id=${orderId}`);
    //   setorder(order.filter(order => order._id !== orderId)); 
    //   window.location.reload();
    // } catch (error) {
    //   console.error('Error removing order:', error);
    // }
  };

  return (
    <>
    <div className="main-order">
    <div className="order1">
            <h1><Link to="/admin/welcome">
                Home
            </Link></h1>
            
            <h1><Link to="/admin/profile" >
                Profile
            </Link></h1>
            <h1><Link to="/admin/alluser">
                Users
            </Link></h1>
            <h1><Link to="/admin/alladmin">
                Admins
            </Link></h1>
            <h1><Link to="/admin/allorder">
                Orders
            </Link></h1>
            <h1><Link to='/'>
            Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
    <div className='order2'>
      <h1 style={{textAlign:"center",color:"#ff9d00", fontSize:"2rem",fontWeight:"bold"}}>Order Details</h1>
    
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
