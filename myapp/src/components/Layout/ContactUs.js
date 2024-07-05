import React, { useState } from 'react'
import Animation from '../Animations/contact.json'
import Lottie from 'lottie-react'
import Footer from './Footer'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Loader from '../Loader'

const ContactUs = () => {
  
  const [loading,setLoading]=useState();
    const initial={
        name: '',
        email: '',
        message: ''
      }
    const [formData, setFormData] = useState(initial);
    const {name,email,message}=formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
   };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          await axios.post('https://mernbackend-2-ebc9.onrender.com/user/contact', formData);
          
          setFormData({ name: '', email: '', message: '' });
          toast.success('Message sent successfully');
        } catch (error) {
          console.error('Failed to send message:', error);
          toast.error('Failed to send message. Please try again later.');
        }finally{
          setLoading(false)
        }
      };

      if(loading){
        return <Loader/>
      }

  return (
    <>
    <div className='login-main' style={{padding:"20px",marginTop:"10%"}} id='contact'>
<div className="signup-container"> 
<h1 style={{fontFamily: "Roboto Slab",color:"#ff9d00",fontSize:"2rem"}}>Contact Us</h1>
   <form className="signup-form" >
        <div>
        <label for="name">
                Name
            </label>
            <input
                type="text"
                name="name"
                value={name}
                placeholder='Name'
                onChange={onChange}
                required
            />
        </div>
        <div>
        <label for="email">
                Email Address
            </label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder='Email'
                onChange={onChange}
                required
            />
        </div>
        <div>
        <label for="message">
                Message
            </label>
            <textarea 
              type="text"
              name='message'
              placeholder="Type your message here..."  
              value={message}
              required
              onChange={onChange}/>
            
        </div>
        <button type="submit" onClick={handleSubmit}>Send Message</button>
    </form><br/>
</div>
<div className='login-image'>
<Lottie animationData={Animation} loop={true} autoplay={true} /></div>

<Toaster/>
</div>
    <Footer/>
    </>
    
  )
}

export default ContactUs