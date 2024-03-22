import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
// import video from '../game.mp4';
// import t3d from '../assets/img/t3d.png';
import Carousel from 'react-bootstrap/Carousel';

// import "./style.css";

const Banner = () => {
  const images = [
   
  ];
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
      loop={true}
      speed={300}
      
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image) => {
        return (
          <SwiperSlide key={image.id}>
            <img src={image.url} alt="image" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
       
<section className="hero" id="hero">
        <div className="container">

          <p className="hero-subtitle" >The wait is over</p>

          <h1 className="h1">Haki</h1>

          <div className="btn-group">

            <button className="btn btn-danger vithu">
              <span>Download Now</span>

              <ion-icon name="play-circle"></ion-icon>
            </button>

            <button style={{textDecoration:"none",fontSize:"30px",color:"white", padding:"5px"}}>Dream making</button>

          </div>

        </div>
      </section>
      <div className="gta">
        <br></br>
        <br></br>
        <br></br>
 <Container >
      <h1 style={{color:"white"}}>Latest Games</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}  >
                  <Product product={product}  />
                </Col>
              );
            })}
        </Row>

      )}
      </Container> 
      
      </div>
    
       <section  style={{ backgroundColor: 'hsl(234, 13%, 13%)', color: 'white' }}>
       
    <Container>
      <Row>
        <Col>  
        {/* <video  loop muted autoPlay style={{margintop:"80px" 
      ,width:"600px",height:"600px"}}>
                 <source  src ={video}/> 
        </video> */}
        </Col>
        <Col style={{marginTop:"50px"}}><h1 className='text-center text-3xl sm:text-2xl md:text-7xl font-bold'> our current work in  <span className='text-center text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500'>
          Haki</span>
              </h1>
              <ul  className='text-start text-3xl sm:text-2xl md:text-7xl font-bold' style={{fontSize:"20px"}}> 
                <li>
                  we   are a team of passionate game developers and design
                </li>
                <li>
                  
                </li>
              </ul>
                </Col>
            
      </Row>
     
    </Container>


      </section>
    
    </>
  );
};

export default HomeScreen;
