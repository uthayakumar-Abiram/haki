import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listUsers, updateRole } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [role, setRole] = useState("");

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, navigate, userInfo]);

  const submitHandler = async (e, id) => {
    e.preventDefault();
    await dispatch(updateRole(id, role)); 
    window.location.reload(); 
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>update role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <i className="bi bi-check2" style={{ color: "green" }}></i>
                    ) : user.role === "user"?(
                      <i className="bi bi-check2" style={{ color: "red" }}></i>
                    ):(
                      <i className="bi bi-x-lg" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Form
                      onSubmit={(e) => submitHandler(e, user._id)}
                      className="d-flex"
                    >
                      <Form.Select
                        aria-label="Default select example"
                        variant="light"
                        className="btn-sm"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="ban">Ban</option>
                      </Form.Select>
                      <Button type="submit" variant="primary" className="ms-2">
                        Edit
                      </Button>
                    </Form>
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
