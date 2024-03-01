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
import { listUsers } from "../actions/userActions";
const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log("delete");
  };
  const updateRole = (id) => {
    console.log("admin");
  };

  return (
    <main>
    <Container>
    <div className="space"></div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>EMAIL</td>
              <td>ADMIN</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.role==="admin" ? (
                      
                      <i class="bi bi-check2"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i class="bi bi-x-lg" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm"  onClick={updateRole(user._id)}>
                      <i class="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={deleteHandler(user._id)}
                    >
                    <i class="bi bi-trash"></i>
                    </Button>
                  </td>
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
