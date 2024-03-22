import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  FormControl,
  Container
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);  
  };

  return (
    <main>
    <Container>
    <div className="space"></div>
      <Link className="btn btn-dark my-3" to="/" variant="danger">
        {" "}
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
          {product && product.images && product.images[0] && (
           <Image src={product.images[0]?.url} alt={product.name} fluid  style={{ height:"288px"}} />)}
           
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>{product.title}</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.totalrating} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: RS {product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
              
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className="btn block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      </Container>
    </main>
  );
};

export default ProductScreen;
