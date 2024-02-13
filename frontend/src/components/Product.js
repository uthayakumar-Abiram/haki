import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    
    <Card className="my-5 p-2 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.images[0]?.url} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration">
          <Card.Title as="div" >
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.requirement} reviews`}
          />
        </Card.Text> */}

        <Card.Text as="h4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Product;
