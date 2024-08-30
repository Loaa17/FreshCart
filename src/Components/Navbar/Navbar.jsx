import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo.svg'
import {UserContext} from "../../Context/UserContext"



export default function Navbar() {

let {userLogin , setuserLogin} = useContext(UserContext);

let navigate = useNavigate();

function signOut(){
  localStorage.removeItem('token');
  setuserLogin(null);
navigate("/login")
}

  return (
    <>

<nav className="bg-slate-100 fixed top-0 left-0 right-0 flex z-10">
  <div className='flex justify-around items-center gap-40 md:justify-between   '>
  <div className="max-w-screen-xl flex flex-wrap  items-center p-4">
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse ml-28">
        <img src={logo} className="w-32" alt="Flowbite Logo" />
    </Link>
    
    <div className="hidden w-full md:block md:w-auto ml-52" id="navbar-default">
      {userLogin != null ? <>
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <NavLink to="home" className="block py-2 px-3 avtive rounded md:bg-transparent text-gray-900 md:p-0 md:hover:text-emerald-500 " aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-emerald-500 md:p-0">Cart</NavLink>
        </li>
        <li>
          <NavLink to="wishlist" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-emerald-500 md:p-0">Wish List</NavLink>
        </li>
        <li>
          <NavLink to="products" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-emerald-500 md:p-0">Products</NavLink>
        </li>
        <li>
          <NavLink to="categories" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-emerald-500 md:p-0">Categories</NavLink>
        </li>
        <li>
          <NavLink to="brands" className="block py-2 px-3 text-gray-900 rounded  md:border-0 md:hover:text-emerald-500 md:p-0">Brands</NavLink>
        </li>
        
      </ul></> : null}
    </div>
  </div>


  <div className="leftSide max-w-screen-xl flex flex-wrap items-center p-4 ml-auto">

<div className="icons text-lg ">
  <span className='mx-2'><i className="fa-brands fa-square-instagram text-pink-700"></i></span>
  <span className='mx-2'><i className="fa-brands fa-facebook text-blue-600"></i></span>
  <span className='mx-2'><i className="fa-brands fa-tiktok text-black"></i></span>
  <span className='mx-2'><i className="fa-brands fa-twitter text-sky-500"></i></span>
  <span className='mx-2'><i className="fa-brands fa-youtube text-red-600"></i></span>
</div>



<div className="mx-10 flex gap-2">

{userLogin != null ? <span onClick={signOut} className='cursor-pointer text-slate-700 hover:text-black'>Sign Out</span> 
: <> <Link to="login">Login</Link>
  <Link to="register">Register</Link></>}

  
 
</div>


  </div>
  </div>
</nav>

    </>
  )
}

