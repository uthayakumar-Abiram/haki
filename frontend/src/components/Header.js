import React from "react";
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
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
    // <header>
    //   <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
    //     <Container>
    //       <LinkContainer to="/">
    //         <Navbar.Brand>Haki</Navbar.Brand>
    //       </LinkContainer>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto">
    //           <LinkContainer to="/cart">
    //             <Nav.Link className="mt-2">
    //               <i className="fas fa-shopping-cart"></i> Cart
    //             </Nav.Link>
    //           </LinkContainer>
    //           {userInfo ? (
    //             <NavDropdown title={userInfo.name} id="username" className="mt-2">
    //               <LinkContainer to="/profile" >
    //                 <NavDropdown.Item>Profile</NavDropdown.Item>
    //               </LinkContainer>
    //               <NavDropdown.Item onClick={logoutHandler}>
    //                 Logout
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           ) : (
    //             <LinkContainer to="/login"className="mt-2">
    //               <Nav.Link>
    //                 {" "}
    //                 <i className="fas fa-user"></i>Sign In
    //               </Nav.Link>
    //             </LinkContainer>
    //           )}
    //           {userInfo && userInfo.role === "admin"&& (
    //             <NavDropdown title="Admin" id="adminmenu" className="mt-2">
    //               <LinkContainer to="/admin/userList" >
    //                 <NavDropdown.Item>Users</NavDropdown.Item>
    //               </LinkContainer>
    //               <LinkContainer to="/admin/productList">
    //                 <NavDropdown.Item>Games</NavDropdown.Item>
    //               </LinkContainer>
    //               <LinkContainer to="/admin/ordrList">
    //                 <NavDropdown.Item>Purchase</NavDropdown.Item>
    //               </LinkContainer>
    //             </NavDropdown>
    //           )}
    //             <Form className="d-flex abi" >
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
<header class="header">

<div class="overlay" data-overlay></div>

<div class="container">

  <Link to="/" class="logo" style={{textDecoration: 'none',color:"orange"}}>
   Haki
  </Link >
  {userInfo && userInfo.role === "admin"&& (
 
 <DropdownButton title= "Admin" id="adminmenu">
 <LinkContainer to="/admin/userList">
<Dropdown.Item>Users</Dropdown.Item>
</LinkContainer>
<LinkContainer to="/admin/productAdd">
<Dropdown.Item>Games</Dropdown.Item>
</LinkContainer>
<LinkContainer to="/admin/orderList">
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
        <a href="#hero" class="navbar-link">Home</a>
      </li>

      <li>
        <a href="#about" class="navbar-link">About</a>
      </li>

      <li>
        <a href="#tournament" class="navbar-link">Action 4</a>
      </li>

      <li>
        <Link to="/cart" class="navbar-link">CART</Link>
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
