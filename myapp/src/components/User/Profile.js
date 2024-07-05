import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeAuth, logout } from '../../store/userSlice';
import '../Cart/Order.css'
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';

const Profile = () => {  
  const [userData, setUserData] = useState(() => {
    const storedUserData = sessionStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  
  const userId=userData?userData.user.id:null;
  const token=userData?userData.token:null;

  const [name, setName] = useState(userData ? userData.user.name : '');
  const [email, setEmail] = useState(userData ? userData.user.email : '');
  const [phone, setPhone] = useState(userData ? userData.user.phone : '');
  const [showModal, setShowModal] = useState(false); 
  const [loading,setLoading]=useState()

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout = () => {
    sessionStorage.clear();  
    dispatch(logout());
    alert("Logged Out Successfully!")
    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
        const response = await axios.put(`https://mernbackend-2-ebc9.onrender.com/user/update?userId=${userId}`, {
        name: name,
        email:email,
        phone:phone,
      },
    {
      headers:{
        Authorization:`Bearer${token}`,
      }
    });
      
      const updatedUserData = response.data;
      sessionStorage.setItem('userData', JSON.stringify({ user:  { ...updatedUserData, id: updatedUserData._id },token:token}));
      
      setUserData({ user: { ...updatedUserData, id: updatedUserData._id } ,token:token});
      setShowModal(false);
      toast.success("user updated!")
      
      window.location.reload();
      
      
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    }finally{
      setLoading(false)
    }
  };
  if(loading){
    return false;
  }
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
      <h1 class=" text-orange-500 font-bold text-xl">Welcome {name}!</h1>
    
    <div className='order-card'>
        <h1>Name:{name}</h1>
    <h2>userphone:{phone}</h2>
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
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

export default Profile