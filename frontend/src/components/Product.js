
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    
    <Card className="my-5 p-2 " style={{ width: '18rem' ,border:"",background:" hsl(240, 11%, 9%)"}} >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.images[0]?.url} variant="top" />
      </Link>

      <Card.Body style={{ color:"white" }}>
        <Link to={`/product/${product._id}`} style={{ textDecoration:"none", color:"white", fontSize:"20px"}}>
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

        <Card.Text as="h4">rs{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;

