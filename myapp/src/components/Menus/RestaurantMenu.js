// RestaurantMenu.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MenuCard from './MenuCard'; 
import './MenuCard.css'; 
import Loader from '../Loader';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading,setLoading]=useState(true);
  
  useEffect(() => {
    setLoading(true)
    axios.get(`https://mernbackend-2-ebc9.onrender.com/menus/${restaurantId}`)
      .then(response => {
        setMenuItems(response.data)})
      .catch(error => console.error('Error fetching menu:', error)).finally(setLoading(false))
  }, [restaurantId]);
  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="menu-list-container">
      <div className="menu-list">
        {menuItems.map(menu => (
          <MenuCard key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
