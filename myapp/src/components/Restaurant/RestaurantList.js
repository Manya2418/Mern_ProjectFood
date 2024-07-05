
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import './RestaurantList.css'
import Loader from '../Loader';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading,setLoading]=useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData=async ()=>{

    setLoading(true)
    try{
      const response=await axios.get('https://mernbackend-2-ebc9.onrender.com/restaurant')
      setRestaurants(response.data);
    }
      catch(error) {
        console.error('There was an error fetching the data!', error);
      }finally{setLoading(false)};
    }
    fetchData()
    
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredRestaurantItems = searchTerm !== '' ?
    restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) :
    restaurants;

  
  if (loading) {
    return <Loader />;
  }


  return (
    <div style={{backgroundColor:"white"}}>
      <h1 style={{textAlign:"center", color:"#ff9d00",fontSize:"1.5rem"}}>Restaurants</h1>
    
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i class="fa-solid fa-magnifying-glass absolute right-2 top-5 text-yellow-500"></i>
      </div>
    <div className="restaurant-list">
      
       {filteredRestaurantItems.map(restaurant => (
          <RestaurantItem key={restaurant._id} restaurant={restaurant}/>
        ))}
    </div>
    </div>
  );
}

export default RestaurantList;
