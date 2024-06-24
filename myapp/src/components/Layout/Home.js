import React from 'react';
import RestaurantList from '../Restaurant/RestaurantList';
import Footer from '../Layout/Footer'
import './Home.css'
import { Link } from 'react-router-dom';
import ContactUs from './ContactUs';
const Home = () => {
  

  return (
    <>
    <div className="home-container">
      
      <video className="background-video" autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/bg2.mp4`} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Flavors that speak louder than words!</h1>
        <p>Creative and expressive way of conveying the idea that the taste and experience of the food at a particular restaurant are so exceptional, distinctive, and satisfying.</p>
        <br/><br/>
        <div className="nav-buttons" > 
          <Link to="/user/login" className="btn" >Login</Link>
          <Link to="/user/signup" className="btn" >Sign Up</Link>
          
        </div>
      </div>
    </div>
      <RestaurantList/>

      <div className='home-page2' >
        <div style={{backgroundColor:"rgba(0, 0, 0, 0.608)",height:"100%"}}>
        
      <h1 id='about'>What Our Clints are saying</h1>
      <div class="review-cards">
        <div class="card">
           <div class="card-content">
           
                
                <p>"The food was absolutely amazing! The best dining experience I've had in a long time. Highly recommend the steak!"<br/><br/></p><br/>
                <div class="flex justify-between">
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User Image"/>
                <h3>John Doe</h3>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-content justify-between">
            <p>"Wonderful ambiance and friendly staff. The desserts were to die for. Will definitely come back soon!"<br/><br/></p>
               
               <br/>
              <div class="flex justify-between">
               <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="User Image"/>
               <h3>Jane Smith</h3></div>
                </div>
        </div>
        <div class="card">
             <div class="card-content">
             <p>"A hidden gem in the city. The pasta dishes were exquisite. Excellent service and great value for money."<br/><br/></p><br/>
            
              <div class="flex">
              <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User Image"/>
              <h3>Mike Johnson</h3>
            </div>
                
               </div>
        </div>
        </div>
    </div>
    </div>
      
      <ContactUs/>
</>
  );
}

export default Home;
