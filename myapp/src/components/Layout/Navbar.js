import React, {  useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, logout } from '../../store/userSlice';
import { initializeAdmin } from '../../store/adminSlice';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const AdminAuthenticated=useSelector((state)=>state.admin.isAuthenticated);

  const items=useSelector((state)=>state.cart)


  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminData = JSON.parse(sessionStorage.getItem('adminData'));
  const adminname=adminData?adminData.admin.name:null;

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const username=userData?userData.user.name:null;

  const handleToggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    sessionStorage.clear();  
    dispatch(logout());
    toast.success('Logged out successfully!');
    toast.success("Logged Out Successfully!")

    navigate('/'); 
    window.location.reload(); 
  };
  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(initializeAdmin())
  }, [dispatch]);
  
  return (
    <nav className='navbar'>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="../../images/logo2.jpg" alt="Logo" style={{width:"85px",height:"85px"}} />
        </a>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" style={{color:"#ffae2c",fontWeight:"bold",fontSize:"1.3rem", textDecoration:"none"}}>Home</Link>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links">Contact Us</a>
          </li>
        
        <div className="nav-buttons">
          {isAuthenticated?(
            <>
            
            
            <Link to="/user/welcome" className="flex flex-col items-center">
            <img src='../../images/userlogo.png' alt="Logo" className="w-8 h-8"/>
            <div className="text-center text-gray-700">{username}</div>
        </Link>
             <button onClick={handleLogout} className="btn">Logout</button>
             <div className='cart-count-div'>
             <Link to="/cart" className="cart-icon"><i class="fa-solid fa-cart-shopping" style={{color: "blue" ,fontSize: "25px",cursor:"pointer",margin:"5px"}}>
            </i><p style={{position:"absolute",top:"5%",right:"0%",backgroundColor:"white", paddingLeft:"7px",paddingRight:"7px",borderRadius:"100%"}} className='cart-count'>{items.length}</p></Link>
            </div>
            </>
        
          ):AdminAuthenticated?(
            <>
            
              
            <Link to="/admin/welcome" className="flex flex-col items-center">
            <img src='../../images/userlogo.png' alt="Logo" className="w-8 h-8"/>
            <div className="text-center text-gray-700">{adminname}</div></Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ):(
            <>
            <Link to="/admin/signup" className="btn">Admin</Link>
            <Link to="/user/signup" className="btn">User</Link>
            </>

          )}
        </div>
        </ul>

        <button className="nav-toggle" onClick={handleToggleMenu}>
          <i className="fa fa-bars"></i>
        </button>
        
      </div>
      <Toaster/>
    </nav>
    
  );
};

export default Navbar;
