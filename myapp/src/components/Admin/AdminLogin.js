import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../User/Signup.css'; 
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { adminlogin } from '../../store/adminSlice';
import { Toaster,toast } from 'react-hot-toast';

const AdminLogin = () => {
    const initial={
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initial);
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

    useEffect(() => {
        const adminData = JSON.parse(sessionStorage.getItem('adminData'));
        if (adminData && !isAuthenticated) {
            dispatch(adminlogin(adminData));
        }
    }, [dispatch, isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/admin/login', formData);
            const adminData={
                admin: res.data.admin,
                token: res.data.token,
            }
            
            sessionStorage.setItem('adminData', JSON.stringify(adminData));
            
            dispatch(adminlogin(adminData))
            setFormData(initial)
            navigate('/')
            toast.success('Login successful!');
            } catch (err) {
            toast.error('Invalid Credentials');
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
            <h1 style={{fontFamily: "Roboto Slab",color:"#ff9d00",fontSize:"2rem"}}>Admin Welcome here...</h1>
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
                <button type="submit">Login</button><br/>
            </form>
           <p>Don't have an account?<Link to="/admin/signup" style={{color:"#ff9d00"}}>Sign Up</Link></p>
            
        </div>
        </div>
        <Toaster />
        </>
    );
};

export default AdminLogin;
