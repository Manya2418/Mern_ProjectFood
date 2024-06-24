import React from 'react'
import Footer from './Footer'
const About = () => {
  return (
    <>
    <div className='about-main' style={{marginTop:"5%"}} >
        <div className='about-main1'>
            <img src="../../../images/man.png"/>

        </div>
        <div className='about-main2'>
            <div>
            <h1>Your Favorite Meals, Just a Click Away!</h1>
            <p>
            Welcome to Manyawar Restaurant,<br/> your premier destination for delicious and convenient food delivery. Our mission is to connect you with your favorite meals from top local restaurants and eateries, offering a diverse range of high-quality food options for every taste and occasion. We pride ourselves on providing a user-friendly platform, fast and reliable service, and meals prepared with the freshest ingredients.
            </p>
            <button className='btn'>Learn More</button></div>
        </div>
    </div>



       <Footer/>
    </>
  )
}

export default About