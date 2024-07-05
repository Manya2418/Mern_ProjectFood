import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, remove } from '../../store/cartSlice';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import {toast,Toaster} from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51NmBxVSJm0EOvE96jDAKUOsep6pg3OfXGtTguyJdXCt0FFxOL8Ipho1HzbWtDVTUin5wJyEFX8jYwcmCrcHTx0gh00spEecMx7");

export const Cart = () => {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const userId = userData ? userData.user.id : null;
  const username=userData?userData.user.name:null;
  const userphone=userData?userData.user.phone:null;
  const useremail=userData?userData.user.email:null;
  
  
  const handleRemove = (itemId) => {
    
    dispatch(remove(itemId));
    toast.success("Removed Successful!")
  };

 const groupItemsById = (items) => {
    return items.reduce((acc, item) => {
      const existingItem = acc.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
  };

  const groupedItems = groupItemsById(items);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice(groupedItems);
  const discount = 0.1;
  const discountedPrice = totalPrice * (1 - discount);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [loading,setLoading]=useState();

  useEffect(() => {

    axios.get('https://mernbackend-2-ebc9.onrender.com/restaurant')
      .then(response => {
        const names = response.data.reduce((acc, restaurant) => {
          acc[restaurant._id] = restaurant.name;
          return acc;
        }, {});
        setRestaurantNames(names);
      })
      .catch(error => console.error('Error fetching restaurant data:', error));
  }, []);



  const handlePayment = async () => {
    if (!userId) {
      toast.error('User not logged in. Please log in to proceed with the payment.');
      return;
    }

    const orderData = {
      userId: userId, 
      userName:username,
      items: groupedItems,
      restaurantName: groupedItems.map(item => restaurantNames[item.restaurantId]).join(', '),
      totalPrice: totalPrice,
      discountedPrice: discountedPrice,
      discount: discount,
    };
    setLoading(true);

    try {
      const respon = await axios.post('https://mernbackend-2-ebc9.onrender.com/order/orderdetails', orderData);

      
      // toast.success('Payment successful!');
      // navigate('/user/welcome')
      // console.log('Order created:', response.data);
      // dispatch(clearCart());
      // sessionStorage.removeItem('cart')

      const response = await axios.post('http://localhost:5000/order/create-checkout-session', orderData);
      const sessionId = response.data.id;

      
      dispatch(clearCart());
      sessionStorage.removeItem('cart')
      toast.success('Payment successful!');
      
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
      
    } 
    catch (error) {
      console.error('Error creating order:', error);
      toast.error('Payment failed. Please try again.');
    }finally{
      setLoading(false)
    }
  };
  
  if (loading) {
    return <Loader />;
  }


  return (
    <>
    <div className='flex justify-center text-center'>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg mt-20">
          {groupedItems.length > 0 ? (
            groupedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 mb-4 rounded-lg gap-11" style={{ backgroundColor: "#ffa51336" }}>
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <h1 className="text-lg font-semibold">Restaurant: {restaurantNames[item.restaurantId]}</h1>
                  
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm font-bold text-blue-600">Rs. {item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div >
                  <button onClick={() => handleRemove(item._id)} aria-label="Remove item" style={{background:"none"}}>
                    <i className="fa-solid fa-trash-can" style={{color: "#ff9d00", fontSize: "30px", cursor: "pointer" }}></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items in the cart.</p>
          )}
        </div>
      </div>
      {groupedItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-20 w-auto h-auto">
          <h1 className='payment-h'>Payment Details</h1>
          <ul>
            {groupedItems.map((item, index) => (
              <li key={index}>
                <div className="flex justify-between">
                  <p>{item.name}  x {item.quantity}</p>
                  <p className="text-blue-600">{(item.price * item.quantity).toFixed(2)} Rs.</p>
                </div>
                <hr />
                <br />
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <p>Total:</p>
            <p className="text-blue-600">{totalPrice.toFixed(2)} Rs.</p>
          </div>
          <div className="flex justify-between">
            <p>Discount:</p>
            <p className="text-blue-600">{(totalPrice * discount).toFixed(2)} Rs.</p>
          </div>
          <div className="flex justify-between">
            <p>Total (10% off):</p>
            <p className="text-blue-600">{discountedPrice.toFixed(2)} Rs.</p>
          </div>
          <button onClick={handlePayment} className="btn" aria-label="Pay Now">Pay Now</button>
        </div>
      )}
    </div>
  
    <Toaster/>
    </>
  );
};