import React, { useEffect, useState } from "react";
import { Table, Button ,Container} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Link, redirect, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "bootstrap-icons/font/bootstrap-icons.css";
import { listOrders } from "../actions/orderActions";
const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, []);

  

  return (
    <main>
    <Container>
    <div className="space"></div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>User</td>
              <td>game</td>
              <td>tax</td>
              <td>total</td>
              <td>paid</td>
             
            </tr>
          </thead>
          <tbody>
            
          {orders &&
  orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td> 
      <td>{order.user}</td>
      <td>{order.orderItems.map(item => item.title).join(', ')}</td> 
      <td>{order.taxPrice}</td> 
      <td>{order.totalPrice}</td> 
      <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
      
    </tr>
  ))}

          </tbody>
        </Table>

      )}
      </Container>
    </main>
  );
};

export default UserListScreen;
