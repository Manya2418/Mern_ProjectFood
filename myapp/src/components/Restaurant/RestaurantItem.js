import React from 'react'
import './RestaurantList.css'
import { Link } from 'react-router-dom'
const RestaurantItem = ({restaurant}) => {
  return (
    <div  className="restaurant-item">
        <Link to={`/restaurant/${restaurant._id}`}>
        <img src={restaurant.imageUrl} alt={restaurant.name} style={{ width: '250px' }} /></Link>
       
        <h3 style={{textTransform:"capitalize",color:"#ff9d00",fontFamily:"unset"}}>{restaurant.name}</h3>
        <p style={{color:"rgba(128, 128, 128, 0.886)",fontSize:"12px", fontFamily: "Roboto Slab"}}>{restaurant.description}</p>
         <p style={{color:"rgba(128, 128, 128, 0.886)",fontSize:"12px", fontFamily: "Roboto Slab"}}>Views: {restaurant.views}</p>
         
    </div>
  )
}

export default RestaurantItem