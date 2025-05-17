import './App.css';
import Home from './components/Layout/Home';
import Navbar from './components/Layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import RestaurantMenu from  './components/Menus/RestaurantMenu'
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import {Provider} from 'react-redux'
import store from './store/store';
import { Cart } from './components/Cart/Cart';
import OrderList from './components/Cart/OrderList';
import Profile from './components/User/Profile';
import Welcome from './components/User/Welcome';
import AdminSignup from './components/Admin/AdminSignup';
import AdminLogin from './components/Admin/AdminLogin';
import AdminWelcome from './components/Admin/AdminWelcome';
import AdminProfile from './components/Admin/AdminProfile';
import AdminAlluser from './components/Admin/AdminAlluser';
import AdminAlladmin from './components/Admin/AdminAlladmin';
import AdminAllorder from './components/Admin/AdminAllorder';
import ContactUs from './components/Layout/ContactUs';
import About from './components/Layout/About';
import ForgotPassword from './components/User/ForgetPassword';
import ResetPassword from './components/User/ResetPassword';
import AllFeedback from './components/Admin/AllFeedback';
// import Location from './components/Layout/Location';
import AddRestaurant from './components/Restaurant/AddRestaurant';
import AdminRestaurants from './components/Admin/AdminRestaurants';
import AddMenuItemForm from './components/Admin/AddMenuItemForm';


function App() {
  
  return (
     <div className="App">
      <Provider store={store}>
      <Navbar/>
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantMenu/>}/>
          <Route path="/restaurant/restaurants" element={<AdminRestaurants/>}/>
          <Route path="/restaurant/res" element={<AdminRestaurants/>}/>
         
          <Route path="/user/signup" element={<Signup/>}/>
          <Route path="/user/login" element={<Login/>}/>
          <Route path="/admin/signup" element={<AdminSignup/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path="/admin/add-restaurant" element={<AddRestaurant />} 
          />
          <Route path="/cart" element={<Cart />} 
          />
          <Route path='/order/orderdetails' element={<OrderList/>}/>
          <Route path='/user/profile' element={<Profile/>}/>
          <Route path='/user/welcome' element={<Welcome/>}/>
          <Route path='/admin/welcome' element={<AdminWelcome/>}/>
          <Route path='/admin/profile' element={<AdminProfile/>}/>
          <Route path='/admin/alluser' element={<AdminAlluser/>}/>
          <Route path='/admin/alladmin' element={<AdminAlladmin/>}/>
          <Route path='/admin/allorder' element={<AdminAllorder/>}/>
          <Route path='/admin/contact' element={<AllFeedback/>}/>
          
          <Route path='/admin/add-menu-item' element={<AddMenuItemForm/>}/>
          <Route path='/user/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/user/resetpassword/:token' element={<ResetPassword/>}/>
      </Routes>
      </Provider>
  </div>
  );
}

export default App;
