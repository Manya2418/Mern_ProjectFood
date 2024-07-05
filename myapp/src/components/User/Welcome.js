import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { initializeAuth, logout } from '../../store/userSlice';
import Animation from '../Animations/welcome.json'
import Lottie from 'lottie-react'
import { Toaster ,toast} from 'react-hot-toast';
import '../Cart/Order.css'

const Welcome = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const username=userData?userData.user.name:null;
   
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
          <h1 class=" text-orange-500 font-bold font-serif text-xl">Hello {username}!</h1>
          <div className="order2_con" >
            <div style={{width:"100%",color:"rgba(0, 0, 0, 0.601)"}}>
            Dear {username},<br/>
            Thank you for choosing Manyawar! <br/><br/>We’re committed to delivering the freshest and tastiest meals right to your doorstep. Our team ensures top-quality ingredients, hygiene, and timely delivery from the best restaurants.
            Your satisfaction is our top priority. Whether it's a quick lunch or a cozy dinner, we promise a delightful dining experience every time.
            Enjoy your meal!<br/><br/>
            Best regards,<br/>
            Manyawar Team
            </div>
          <Lottie animationData={Animation} loop={true} autoplay={true} /></div>
        </div>
        </div>
      <Toaster/>
    </>
  )
}

export default Welcome