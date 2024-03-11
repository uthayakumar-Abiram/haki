import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Container
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
// import { saveShippingAddress } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { register } from "../actions/userActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);

  //calculate prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price , 0)
  );

  cart.taxPrice = addDecimals(Number((0.12 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
  
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, success, error} = orderCreate

  useEffect(() => {
    if(success){
      navigate(`/orders/${order._id}`)
    }
  },[success])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems : cart.cartItems,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice
    }))
  };
  return (
    <main>
    <Container>
     <div className="space"></div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.images?.[0]?.url}
                            alt={item.tilte}
                          //   style={{height:"100px",
                          // width:"100px"}}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs{cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

            

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs{cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs{cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </Container>
    </main>
    
  );
};

export default PlaceOrderScreen;
