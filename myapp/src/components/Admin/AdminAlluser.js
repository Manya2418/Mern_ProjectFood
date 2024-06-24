import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout, initializeAdmin } from '../../store/adminSlice';
import Card from './Card';
import toast, { Toaster } from 'react-hot-toast';

const AdminAlluser=()=> {
    const [users, setUsers] = useState([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
   
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/alluser');
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
            <h1><Link to='/'>Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        
        <div className='order2'>
        <h1 class=" text-orange-500 font-bold text-xl">All Users</h1>
    
            {users.map(user => (<Card key={user._id} user={user}/>))}
            
            </div>

        </div>
        <Toaster/>
        </>

    );
}

export default AdminAlluser;
