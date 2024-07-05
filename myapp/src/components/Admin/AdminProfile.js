import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeAdmin,  adminlogout } from '../../store/adminSlice';
import '../Cart/Order.css'
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
import Loader from '../Loader';

const AdminProfile = () => {
  const [adminData, setadminData] = useState(() => {
    const storedadminData = sessionStorage.getItem('adminData');
    return storedadminData ? JSON.parse(storedadminData) : null;
  });
  
  const adminId=adminData?adminData.admin.id:null;
  const token=adminData?adminData.token:null;
  const [name, setName] = useState(adminData ? adminData.admin.name : '');
  const [email, setEmail] = useState(adminData ? adminData.admin.email : '');
  const [showModal, setShowModal] = useState(false); 
  const [loading,setLoading]=useState()
  
  

  const navigate=useNavigate();
 const dispatch=useDispatch();

  const handleLogout = () => {
    
    sessionStorage.clear();  
    dispatch(adminlogout());
    alert("Logged Out Successfully!")

    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAdmin());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axios.put(`https://mernbackend-1-9ihi.onrender.com/admin/update?adminId=${adminId}`, {
        name: name,
        email:email,
      },
    {
      headers:{
        Authorization:`Bearer${token}`,
        
      }
    });
      
      const updatedAdminData = response.data;
      sessionStorage.setItem('adminData', JSON.stringify({ admin:  { ...updatedAdminData, id: updatedAdminData._id },token:token}));
      
      setadminData({ admin: { ...updatedAdminData, id: updatedAdminData._id } ,token:token});
      toast.success("Admin updated!")
      setShowModal(false);
      window.location.reload();
      
      
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }finally{
      setLoading(false)
    }
  };

  if(loading){
    return <Loader/>
  }
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
            <h1><Link to="/admin/contact">Feedback</Link></h1>
            <h1><Link to='/'>
            Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
    <div className='order2'>
      <h1 class=" text-orange-500 font-bold text-xl">Welcome {name}!</h1>
    
    <div className='order-card'>
        <h1>Name:{name}</h1>
    <h2>email:{email}</h2>
    <button onClick={() => setShowModal(true)}>Update Profile</button>
        
    </div></div>
    </div>
    {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
      <Toaster/>
    </>
    
  )
}

export default AdminProfile