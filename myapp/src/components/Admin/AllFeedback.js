import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout, initializeAdmin } from '../../store/adminSlice';
import Card from './Card';
import toast, { Toaster } from 'react-hot-toast';

const AllFeedback=()=> {
    const [users, setUsers] = useState([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
   
     const handleLogout = () => {
       dispatch(adminlogout());
       toast.success("Logged Out Successfully!")
   
       navigate('/'); 
       window.location.reload(); 
     };
     useEffect(() => {
       dispatch(initializeAdmin());
     }, [dispatch]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://mernbackend-2-ebc9.onrender.com/user/contact');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
        <div className="main-order">
            <div className="order1">
            <h1><Link to="/admin/welcome">Home</Link></h1>
            
            <h1><Link to="/admin/profile" >Profile</Link></h1>
            <h1><Link to="/admin/alluser">Users </Link></h1>
            <h1><Link to="/admin/alladmin">Admins</Link></h1>
            <h1><Link to="/admin/allorder">Orders</Link></h1>
            <h1><Link to="/admin/contact">Feedback</Link></h1>
            <h1><Link to='/'>Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        
        <div className='order2'>
        <h1 class=" text-orange-500 font-bold text-xl">All Feedback</h1>
    
            {users.map(user => (
        
                <div className="order-card">
                Name:{user.name} <br/>
                Email:{user.email} <br />
                Message:{user.message}
    </div>
        ))}
            
            </div>

        </div>
        <Toaster/>
        </>

    );
}

export default AllFeedback;
