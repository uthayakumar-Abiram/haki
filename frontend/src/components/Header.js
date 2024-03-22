import React from "react";
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
import logo from "./HAKI-10.png"
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Navbar, Nav, Container, NavDropdown ,Form,Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link> */}

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return ( 
<header class="header">

<div class="overlay" data-overlay></div>

<div class="container">

  <Link to="/"  style={{textDecoration: 'none',color:"orange"}}>
  <img src={logo} style={{height:'125px',width:'125px'}} ></img>
  </Link >
  {userInfo && userInfo.role === "admin"&& (
 
 <DropdownButton title= "Admin" id="adminmenu">
 <LinkContainer to="/admin/userList">
<Dropdown.Item>Users</Dropdown.Item>
</LinkContainer>
<LinkContainer to="/admin/productAdd">
<Dropdown.Item>Games</Dropdown.Item>
</LinkContainer>
<LinkContainer to="/admin/OrderList">
<Dropdown.Item>Purchase</Dropdown.Item>
</LinkContainer>
</DropdownButton>)}
  <button class="nav-open-btn" data-nav-open-btn>
    <ion-icon name="menu-outline"></ion-icon>
  </button>

  <nav class="navbar" data-nav>

    <div class="navbar-top">

      <Link to="/" class="logo">
        Haki
      </Link>

      <button class="nav-close-btn" data-nav-close-btn>
        <ion-icon name="close-outline"></ion-icon>
      </button>
      
    </div>

    <ul class="navbar-list">

      <li>
        <Link to="/" class="navbar-link active" >Home</Link>
      </li>

      <li>
        <a href="#about" class="navbar-link">About</a>
      </li>

      <li>
        <a href="#tournament" class="navbar-link">Action 4</a>
      </li>

      <li>
        <Link to="/cart" class="navbar-link">Cart</Link>
      </li>

      <li>
        <a href="#gears" class="navbar-link">Action 5</a>
      </li>

      <li>
        <a href="#contact" class="navbar-link">Contact</a>
      </li>

    </ul>

    <ul class="nav-social-list">

      <li>
        
        <a href="#" class="social-link">
          <ion-icon name="logo-twitter"></ion-icon>
        </a>
      </li>

      <li>
        <a href="#" class="social-link">
          <ion-icon name="logo-instagram"></ion-icon>
        </a>
      </li>

      <li>
        <a href="#" class="social-link">
          <ion-icon name="logo-github"></ion-icon>
        </a>
      </li>

      <li>
        <a href="#" class="social-link">
          <ion-icon name="logo-youtube"></ion-icon>
        </a>
      </li>

    </ul>

  </nav>

  <div class="header-actions">

    <button class="search">
      <ion-icon name="search-outline"></ion-icon>
    </button>
    {userInfo ? (
                  <DropdownButton title={userInfo.name} id="username" variant="danger">
                    <LinkContainer to="/profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
       <Link to="/login"className="mt-2">
                 
    <button class="btn-sign_in">

<div class="icon-box">
  <ion-icon name="log-in-outline"></ion-icon>
</div>

<span>Log-in</span>

</button>
                </Link>
              )}
  </div>

</div>

  </header>




  );
};

export default Header;
