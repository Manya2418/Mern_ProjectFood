
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import './RestaurantList.css'
import Loader from '../Loader';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading,setLoading]=useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/restaurant');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    // Get user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation(null);
        }
      );
    }
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
      <h1 style={{textAlign:"center", color:"#12a9a1",fontSize:"1.5rem"}}>Shops</h1>
    
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <i class="fa-solid fa-magnifying-glass absolute right-2 top-5 text-brand"></i>
      </div>
    <div className="restaurant-list">
      
       {filteredRestaurantItems.map(restaurant => (
          <RestaurantItem
          key={restaurant._id}
          restaurant={restaurant}
          userLocation={userLocation}
        />
        ))}
    </div>
    </div>
  );
}

export default RestaurantList;
