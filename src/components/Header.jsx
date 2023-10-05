import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';


const Header = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setloading } =  useContext(Context);
  
  const LogoutHandler = async()=>{
    
    setloading(true);

    try {
     
   await axios.get(`${server}/users/logout`,
  
    {
     withCredentials: true,
    }
    );
    toast.success('Logged Out Successfully')
    setIsAuthenticated(false);
    setloading(false);

    } catch (error) {
     toast.error(error.response.data.message);
     setIsAuthenticated(true);
     setloading(false);
    }
   };



  return (
    <nav className="header">
    <div>
        <h2>Todo App.</h2>
    </div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated ? (<button disabled ={loading} onClick={LogoutHandler} className='btn'>Logout</button>) : (<Link to={"/login"}>Login</Link>)
        }  
    </article>
  </nav>

  )
};

export default Header;