import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ims from"./HAKI-3.png"
import background from "./assets/images/footer-bg.jpg"
const Footer = () => {
  return (
       
  <footer>

<div class="footer-top"style={{ backgroundImage: `url(${background})` }}>
  <div class="container">

    <div class="footer-brand-wrapper">

      <Link to="/home" class="logo">
        <img src={ims} alt="haki" style={{ height:"200px",width:"auto"}}/>
      </Link>

      <div class="footer-menu-wrapper">

        <ul class="footer-menu-list" >

          <li>
            <a href="#hero" class="footer-menu-link" style={{textDecoration:"none"}}>Home</a>
          </li>

          <li>
            <a href="#about" class="footer-menu-link"style={{textDecoration:"none"}}>About</a>
          </li>

          <li>
            <a href="#tournament" class="footer-menu-link"style={{textDecoration:"none"}}>Action</a>
          </li>

          <li>
            <a href="#team" class="footer-menu-link"style={{textDecoration:"none"}}>Action</a>
          </li>

          <li>
            <a href="#gears" class="footer-menu-link" style={{textDecoration:"none"}}>Action</a>
          </li>

          <li>
            <a href="#" class="footer-menu-link" style={{textDecoration:"none"}}>Contact</a>
          </li>

        </ul>

        <div class="footer-input-wrapper">
          <input type="text" name="message" required placeholder="Find Here Now" class="footer-input"/>

          <button class="btn btn-primary">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>

      </div>

    </div>

    <div class="footer-quicklinks">

      <ul class="quicklink-list">

        <li>
          <a href="#" class="quicklink-item" style={{textDecoration:"none"}}>Faq</a>
        </li>

        <li>
          <a href="#" class="quicklink-item" style={{textDecoration:"none"}}>Help center</a>
        </li>

        <li>
          <a href="#" class="quicklink-item"style={{textDecoration:"none"}}>Terms of use</a>
        </li>

        <li>
          <a href="#" class="quicklink-item"style={{textDecoration:"none"}}>Privacy</a>
        </li>

      </ul>

      <ul class="footer-social-list">

        <li>
          <a href="#" class="footer-social-link"style={{textDecoration:"none"}}>
            <ion-icon name="logo-discord"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="footer-social-link"style={{textDecoration:"none"}}>
            <ion-icon name="logo-twitch"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="footer-social-link"style={{textDecoration:"none"}}>
            <ion-icon name="logo-xbox"></ion-icon>
          </a>
        </li>

        <li>
          <a href="#" class="footer-social-link"style={{textDecoration:"none"}}>
            <ion-icon name="logo-youtube"></ion-icon>
          </a>
        </li>

      </ul>

    </div>

  </div>
</div>

<div class="footer-bottom">
  <div class="container">
    <p class="copyright">
      Copyright &copy; 2024 <a href="#">Haki</a>. all rights reserved
    </p>

    <figure class="footer-bottom-img">
      <img src="./assets/images/footer-bottom-img.png" alt="Online payment companies logo"/>
    </figure>
  </div>
</div>

</footer>
  )
}

export default Footer