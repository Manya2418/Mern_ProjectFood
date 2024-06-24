import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { initializeAdmin, adminlogout } from '../../store/adminSlice';
import Animation from '../Animations/welcome.json'
import Lottie from 'lottie-react'
import { Toaster ,toast} from 'react-hot-toast';


const AdminWelcome = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const adminData = JSON.parse(sessionStorage.getItem('adminData'));
    const username=adminData?adminData.admin.name:null;
   
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
  return (
    <>
     <div className="main-order">
        <div className="order1">
            <h1><Link to="/admin/welcome"> Home </Link></h1>
            
            <h1><Link to="/admin/profile" >Profile</Link></h1>
            <h1><Link to="/admin/alluser">Users</Link></h1>
            <h1><Link to="/admin/alladmin">Admins</Link></h1>
            <h1><Link to="/admin/allorder">Orders</Link></h1>
            <h1><Link to="/admin/contact">Feedback</Link></h1>
            <h1><Link to='/'>Go Back </Link></h1>
            
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        <div className='order2'>
        <h1 class=" text-orange-500 font-bold font-serif text-xl">Hello {username}!</h1>
           
          <div class="flex p-9" >
            <div style={{width:"100%",color:"rgba(0, 0, 0, 0.601)"}}>
            Dear {username},<br/><br/>
            Thank you for your hard work and dedication.<br/> Your efforts keep Manyawar running smoothly and efficiently. Your commitment and excellence make a huge impact every day.
We appreciate everything you do. Keep up the great work!<br/><br/>
Best regards,<br/>Team Manyawar
            </div>
          <Lottie animationData={Animation} loop={true} autoplay={true} /></div>
        </div>
        </div>
      <Toaster/>
    </>
  )
}

export default AdminWelcome