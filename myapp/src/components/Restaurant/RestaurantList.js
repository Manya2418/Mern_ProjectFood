
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantItem from './RestaurantItem';
import './RestaurantList.css'
import Loader from '../Loader';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/restaurant')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      }).finally(setLoading(false));
  }, []);

  
  if (loading) {
    return <Loader />;
  }


  return (
    <div style={{backgroundColor:"white"}}>
      <h1 style={{textAlign:"center", color:"#ff9d00",fontSize:"1.5rem"}}>Restaurants</h1>
    
    <div className="restaurant-list">
      
       {restaurants.map(restaurant => (
          <RestaurantItem key={restaurant._id} restaurant={restaurant}/>
        ))}
    </div>
    </div>
  );
}

export default RestaurantList;
