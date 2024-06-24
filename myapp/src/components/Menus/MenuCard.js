import React from 'react';
import './MenuCard.css';
import {add}  from '../../store/cartSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const MenuCard = ({ menu }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleAdd = (menu) => {
        if (!isAuthenticated) {
            alert("If User Please Login First!");
            sessionStorage.clear();
            navigate('/user/login');
            window.location.reload();
        } else {
            toast.success("Item added!")
            dispatch(add(menu));
            
        }
    };

    return (
        <>
        <div className="menu-card">
            
            <img src={menu.imageUrl} alt={menu.name} className="menu-image" />
            <h2 className="menu-name">{menu.name}</h2>
            <p className="menu-description">{menu.description}</p>
            <p className="menu-price">Price: Rs.{menu.price}</p>
            <p className="menu-stock">{menu.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <button onClick={() => handleAdd(menu)} className="btn-add" >Add to Cart</button>
        </div>
        <Toaster/>
        </>
        
    );
};

export default MenuCard;
