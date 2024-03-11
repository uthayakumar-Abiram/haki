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
  Container
} from "react-bootstrap";
import { productsAdd} from "../actions/productActions";
const Productlist = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.productList);
  const { loading, error, product } = products;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [ title, setTitle] = useState("");
  const [ price, setPrice] = useState("");
  const [ requirement, setRequirement] = useState("");
  const [ images, setImage] = useState(null);
  const [ description ,setdescription]=useState("")
  console.log(title)
  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(productsAdd());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

    const submitHandler = (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.set("title", title);
      formData.set("price", price);
      formData.set("requirement", requirement);
      formData.set("images", images);
      formData.set("description",description)
 
      dispatch(productsAdd(formData))
    };

  return (
    <main>
    <Container>
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
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="Price">
          <FormLabel>Price</FormLabel>
          <FormControl
            type="number"
            placeholder="Enter Price"
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="Requirem
        ent">
          <FormLabel>Requirement</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter The Requirement"
            value={requirement}
            name="requirement"
            onChange={(e) => setRequirement(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="description">
          <FormLabel>description</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter The Requirement"
            value={description}
            name="description"
            onChange={(e) => setdescription(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="images">
          <FormLabel>Image</FormLabel>
          <FormControl
            type="file"
            placeholder="Add image"
            name="images"
            onChange={(e) => setImage(e.target.files[0])}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          New Game
        </Button>
      </Form>
     
    </FormContainer>
    </Container>
    </main>
  
  );
};

export default Productlist;
