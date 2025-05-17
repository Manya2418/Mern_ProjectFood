// components/AddMenuItemForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout } from '../../store/adminSlice';

const AddMenuItemForm = () => {
  const [formData, setFormData] = useState({
    restaurantId: '',
    name: '',
    description: '',
    imageUrl: '',
    price: '',
    inStock: true
  });

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleLogout = () => {
      sessionStorage.clear();
      dispatch(adminlogout());
      alert("Logged Out Successfully!");
  
      navigate("/");
      window.location.reload();
    };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/admin/add-menu-item', formData);
      alert('Menu item added successfully!');
      setFormData({
        restaurantId: '',
        name: '',
        description: '',
        imageUrl: '',
        price: '',
        inStock: true
      });
    } catch (error) {
      console.error('Failed to add menu item:', error);
      alert('Failed to add menu item.');
    }
  };

  return (
    <>
    <div className="w-64 bg-teal-600 text-white fixed top-0 left-0 bottom-0 p-6 ">
              <h2 className="text-2xl font-bold mb-6">Profile Menu</h2>
              <ul>
                <li>
                  <Link
                    to="/admin/welcome"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/profile"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    User Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/add-restaurant"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    Add Shop
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/restaurant/res"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
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
                  <Link
                    to="/admin/alluser"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    Customer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/alladmin"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    Seller
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/allorder"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    All Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/contact"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
                    Feedback
                  </Link>
                </li>
    
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-4 hover:bg-teal-500 rounded-md"
                  >
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
            
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin:"auto",marginTop:"70px" }}>
      
      <h1 class=" text-orange-500 font-bold text-xl text-center">Add New Menu Item</h1>
      
      <input
        type="text"
        name="restaurantId"
        placeholder="Restaurant ID"
        value={formData.restaurantId}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      {/* <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      /> */}

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>
        In Stock:
        <input
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Menu Item</button>
    </form>
    </>
  );
};

export default AddMenuItemForm;
