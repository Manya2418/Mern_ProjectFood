import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'; 
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/userSlice';
import { Toaster ,toast} from 'react-hot-toast';

const Login = () => {
    const initial={
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initial);

    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData && !isAuthenticated) {
            dispatch(login(userData));
        }
    }, [dispatch, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mernbackend-2-ebc9.onrender.com/user/login', formData);
            const userData={
                user: res.data.user,
                token: res.data.token,
            }
            
            sessionStorage.setItem('userData', JSON.stringify(userData));
            
            dispatch(login(userData))
            setFormData(initial)
            toast.success("Login Successful!")
            navigate('/')
            } catch (err) {
            toast.error('Invalid Details');
            console.error(err);
            setFormData(initial)
        }
    };
    


    return (
        <>
        <div className='login-main'>

        
        <div className='login-image' >
            <img src='../../images/new_background.avif' style={{width:"100%",height:"100%"}}/>
        </div>
        
        <div className="login-container">
            <h1 style={{fontFamily: "Roboto Slab",color:"#ff9d00",fontSize:"2rem"}}>Foodies Welcome here...</h1>
            <p>Please login with your details here</p><br/>
               <form className="login-form" onSubmit={handleSubmit}>
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
                <label for="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder='Password'
                        onChange={onChange}
                        required
                    />

                </div>
                <p onClick={() => navigate('/user/forgotpassword')} style={{color:"#e68a00",cursor:"pointer"}}>Forgot Password</p><br/>
             
                <button type="submit">Login</button><br/>
            </form>
                  
             <p>Don't have an account?<Link to="/user/signup" style={{color:"#ff9d00"}}>Sign Up</Link></p>
            <Toaster />
        </div>
        </div>
        </>
    );
};

export default Login;
