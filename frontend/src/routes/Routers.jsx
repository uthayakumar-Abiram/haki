import React from 'react';
import Home from '../pages/Home';
import Product from'../pages/product';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import {Routes, Route} from 'react-router-dom'


const Routers =()=>{
    return <Routes>
        < Route path="/" element={<Home/>} />
        < Route path="/home" element={<Home/>} />
        < Route path="/login" element={<Login/>} />
        < Route path="/register" element={<Signup/>} />
        < Route path="/contact" element={<Contact/>} />
        < Route path="/product" element={<Product/>} />
    </Routes>  
};

export default Routers;