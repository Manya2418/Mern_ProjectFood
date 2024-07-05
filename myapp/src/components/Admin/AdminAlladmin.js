import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogout, initializeAdmin } from '../../store/adminSlice';
import Loader from '../Loader'

const AdminAlladmin=()=> {
    const [users, setUsers] = useState([]);
    const [loading,setLoading]=useState();

    const [searchTerm, setSearchTerm] = useState('');

    const navigate=useNavigate();
    const dispatch=useDispatch();
   
     const handleLogout = () => {
       sessionStorage.clear();  
       dispatch(adminlogout());
       alert("Logged Out Successfully!")
   
       navigate('/'); 
       window.location.reload(); 
     };
     useEffect(() => {
       dispatch(initializeAdmin());
     }, [dispatch]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await axios.get('https://mernbackend-2-ebc9.onrender.com/admin/alladmin');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }finally{
                setLoading(false)
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
      const filteredUser = searchTerm !== '' ?
        users.filter(user=>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) :
        users;

    if(loading){
        return <Loader/>
    }
    return (
        <div className="main-order">
            <div className="order1">
            <h1><Link to="/admin/welcome">Home</Link></h1>
            <h1><Link to="/admin/profile" >Profile </Link></h1>
            <h1><Link to="/admin/alluser">Users</Link></h1>
            <h1><Link to="/admin/alladmin">Admins</Link></h1>
            <h1><Link to="/admin/allorder"> Orders</Link></h1>
            <h1><Link to='/'>Go Back </Link></h1>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        
        <div className='order2'>
        <h1 class=" text-orange-500 font-bold text-xl">All Admin</h1>

            <div className="search-container">
            <input
            type="text"
            placeholder="Search Admin..."
            value={searchTerm}
            onChange={handleSearch}
            />
            <i class="fa-solid fa-magnifying-glass absolute right-2 top-5 text-yellow-500"></i>
        </div>
            <table className="users-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
        </div>
        
    );
}

export default AdminAlladmin;
