// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
     toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`https://mernbackend-2-ebc9.onrender.com/user/resetpassword/${token}`, { password });

      if (response.status === 200) {
        toast.success('Password has been reset!');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
    <div className="forgot-password-container">
      <h2 className="forgot-password-heading">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label >
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="forgot-password-input"
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="forgot-password-input"
            required
          />
        </label>
        <button type="submit" className="forgot-password-button">Submit</button>
      </form>
    </div>
    <Toaster/>
    </>
  );
};

export default ResetPassword;
