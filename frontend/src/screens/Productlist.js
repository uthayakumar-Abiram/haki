import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link, redirect, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { productsAdd} from "../actions/productActions";
const Productlist = () => {


    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImage] = useState("");
    const [ requirement, setRequirement] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.productList);
  const { loading, error, product } = products;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(productsAdd());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

//   const LoginScreen = ({ location }) => {
    //     const [email, setEmail] = useState("");
    //     const [password, setPassword] = useState("");
  
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
  
    //   const redirect = location.search ? location.search.split("=")[1] : "/";
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(productsAdd(title, price,images,requirement))
    };
//   const deleteHandler = (id) => {
//     console.log("delete");
//   };

  return (
    <>
     <div className="space"></div>
      
    <FormContainer>
      <h1>create product</h1>
      {
        error && <Message variant='danger'>{error}</Message>
      }
      {
        loading && <Loader/>
      }
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="title">
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="Price">
          <FormLabel>Price</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="Requirement">
          <FormLabel>Requirement</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter The Requirement"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="image">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="file"
            placeholder="Add image"
            value={images}
            onChange={(e) => setImage(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          New Game
        </Button>
      </Form>
     
    </FormContainer>
   
    </>
  
  );
};

export default Productlist;
