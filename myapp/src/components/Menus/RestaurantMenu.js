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
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    setLoading(true)
    const fetchData=async()=>{
      try{
        const response=await axios.get(`http://localhost:4000/menus/${restaurantId}`)
        setMenuItems(response.data)
      }catch(error){
        console.error('Error fetching menu:', error)
      }finally{setLoading(false)}
    }
    fetchData();
      
  }, [restaurantId]);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredMenuItems = searchTerm !== '' ?
    menuItems.filter(menu =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) :
    menuItems;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="menu-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i class="fa-solid fa-magnifying-glass absolute right-2 top-5 text-yellow-500"></i>
      </div>
      <div className="menu-list">
        {filteredMenuItems.map(menu => (
          <MenuCard key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
