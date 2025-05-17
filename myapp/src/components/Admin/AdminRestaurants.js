import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import '../Restaurant/RestaurantList.css';
import RestaurantItem from '../Restaurant/RestaurantItem';

const AdminRestaurants = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(sessionStorage.getItem('adminData'));
    const adminId = adminData?.admin?.id || null;

    if (adminId) {
      setName(adminData.admin.name || '');
      setEmail(adminData.admin.email || '');
      axios
        .get(`http://localhost:4000/restaurant/res?adminId=${adminId}`)
        .then((response) => {
          setFoodItems(response.data);
        })
        .catch((err) => {
          setError('Error fetching food items');
          console.error(err);
        });
    } else {
      setError('Admin data not found in session storage.');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminData');
    navigate('/admin/login');
    window.location.reload();
  };

  return (
    <>
      <div className="main-order">
        {/* Sidebar */}
        <div className="order1">
          <div className="w-64 bg-teal-600 text-white fixed top-0 left-0 bottom-0 p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Menu</h2>
            <ul>
              <li>
                <Link to="/admin/welcome" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin/profile" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  User Profile
                </Link>
              </li>
              <li>
                <Link to="/admin/add-restaurant" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Add Shop
                </Link>
              </li>
              <li>
                <Link to="/restaurant/res" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Your Shop
                </Link>
              </li>
              <li>
                            <Link
                              to="/admin/add-menu-item"
                              className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                            >
                              Add menu
                            </Link>
                          </li>
              <li>
                <Link to="/admin/alluser" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Customer
                </Link>
              </li>
              <li>
                <Link to="/admin/alladmin" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Seller
                </Link>
              </li>
              <li>
                <Link to="/admin/allorder" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  All Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/contact" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/" className="block py-2 px-4 hover:bg-teal-500 rounded-md">
                  Go Back
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 px-4 mt-6 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>


        <div style={{ backgroundColor: 'white', marginLeft: '270px', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#12a9a1', fontSize: '1.5rem', marginTop:"50px" }}>
            Your Shops
          </h1>

          {/* {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>} */}

          <div className="restaurant-list">
            {foodItems.length > 0 ? (
              foodItems.map((restaurant) => (
                <RestaurantItem key={restaurant._id} restaurant={restaurant} />
              ))
            ) : (
              <p style={{ textAlign: 'center', fontFamily: 'Roboto Slab', marginTop: '20px' }}>
                No shops found for this admin.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRestaurants;
