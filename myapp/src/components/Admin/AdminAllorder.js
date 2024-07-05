import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import OrderCard from "../Cart/OrderCard";
import { initializeAdmin, adminlogout } from "../../store/adminSlice";
import toast, { Toaster } from "react-hot-toast";
import './Admin.css'
import '../Cart/Order.css'
import Loader from "../Loader";
function OrderList() {
  const [order, setorder] = useState([]);
  const [loading,setLoading]=useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchDate, setSearchDate] = useState('');
  useEffect(() => {
    const fetchorders = async () => {
      const admindata = JSON.parse(sessionStorage.getItem("adminData"));
      const token = admindata.token;
      if (!token) {
        alert("No authorized user found");
        navigate("/user/login");
        return;
      }
      setLoading(true)
      try {
        const response = await axios.get(
          `https://mernbackend-1-9ihi.onrender.com/admin/allorder`
        );

        setorder(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }finally{
        setLoading(false)
      }
    };

    fetchorders();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(adminlogout());
    alert("Logged Out Successfully!");

    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(initializeAdmin());
  }, [dispatch]);

  const handleRemoveOrder = async (orderId) => {
    // try {
    //   await axios.delete(`http://localhost:5000/order/delete?id=${orderId}`);
    //   setorder(order.filter(order => order._id !== orderId));
    //   window.location.reload();
    // } catch (error) {
    //   console.error('Error removing order:', error);
    // }

  
  };


  
  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };


  const filteredOrders = searchDate
  ? order.filter(order => new Date(order.orderDate).toLocaleDateString() === new Date(searchDate).toLocaleDateString())
  : order;

  if(loading){
    return <Loader/>
  }

  return (
    <>
      <div className="main-order">
        <div className="order1">
          <h1> <Link to="/admin/welcome">Home</Link></h1>
          <h1><Link to="/admin/profile">Profile</Link></h1>
          <h1><Link to="/admin/alluser">Users</Link></h1>
          <h1> <Link to="/admin/alladmin">Admins</Link></h1>
          <h1><Link to="/admin/allorder">Orders</Link></h1>
          <h1><Link to="/admin/contact">Feedback</Link></h1>
          <h1><Link to="/">Go Back </Link></h1>

          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
        <div className="order2">
          <h1
            style={{
              color: "#ff9d00",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Order Details
          </h1>
          <div className="search-bar">
            <input
              type="date"
              value={searchDate}
              onChange={handleSearchDateChange}
              placeholder="Search by Date"
            />
          </div>
      <table className="users-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Ordered by</th>
                  <th>Restaurant</th>
                  <th>Total Price</th>
                  <th>Discounted Price</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userName}</td>
                    <td>{order.restaurantName}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.discountedPrice}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>

          <div className="restaurant-list">
            {order.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onRemove={handleRemoveOrder}
              />
            ))}
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default OrderList;
