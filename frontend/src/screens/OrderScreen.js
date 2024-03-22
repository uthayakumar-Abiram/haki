import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckout from "react-stripe-checkout"
import { StripeProvider } from 'react-stripe-elements';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Container
} from "react-bootstrap";
import PayButton from "../components/payButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { Axios } from "../utils";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  //calculate prices

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
   

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        // addPayPalScript();
      } else {
        setSdkReady(false);
      }
    }
  }, [order, id, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    
    <Loader />
    
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <main>
    <Container>
     <div className="space"></div>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <Link to={`mailto:${order.user.email}`}>
                  {order.user.email}
                </Link>
              </p>
             
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
          
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.images?.[0]?.url}
                            alt={item.title}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
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
              
                  <Col>Rs{order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>

             
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs{order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs{order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
             
             <PayButton orderItems ={order.orderItems} orderId ={order._id} total={order.totalPrice}/>
                    
        
            </ListGroup>
          </Card>
        </Col>
      </Row>
    
      </Container>
      
    </main>
  );
};

export default OrderScreen;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PayPalButton } from "react-paypal-button-v2";

// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Card,
//   ListGroupItem,
//   Container
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getOrderDetails, payOrder } from "../actions/orderActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { ORDER_PAY_RESET } from "../constants/orderConstants";
// import { Axios } from "../utils";

// const OrderScreen = () => {
//   const [sdkReady, setSdkReady] = useState(false);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, loading, error } = orderDetails;

//   const orderPay = useSelector((state) => state.orderPay);
//   const { loading: loadingPay, success: successPay } = orderPay;

//   //calculate prices

//   if (!loading) {
//     const addDecimals = (num) => {
//       return (Math.round(num * 100) / 100).toFixed(2);
//     };

//     order.itemsPrice = addDecimals(
//       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//     );
//   }

//   useEffect(() => {
//     const addPayPalScript = async () => {
//       const { data: clientId } = await axios.get("/api/pay/stripeapi");
//       const script = document.createElement("script");
//       script.type = "text/javascript";
//       script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
//       script.async = true;
//       script.onload = () => {
//         setSdkReady(true);
//       };
//       document.body.appendChild(script);
//     };

//     addPayPalScript();

//     if (!order || successPay) {
//       dispatch({ type: ORDER_PAY_RESET });
//       dispatch(getOrderDetails(id));
//     } else if (!order.isPaid) {
//       if (!window.paypal) {
//         // addPayPalScript();
//       } else {
//         setSdkReady(false);
//       }
//     }
//   }, [order, id, successPay]);

//   const successPaymentHandler = (paymentResult) => {
//     dispatch(payOrder(id, paymentResult));
//   };

//   return loading ? (
    
//     <Loader />
    
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <main>
//     <Container>
//      <div className="space"></div>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroupItem>
//               <p>
//                 <strong>Name:</strong>
//                 {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>
//                 <Link to={`mailto:${order.user.email}`}>
//                   {order.user.email}
//                 </Link>
//               </p>
             
//             </ListGroupItem>
//             <ListGroupItem>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method:</strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Paid</Message>
//               )}
//             </ListGroupItem>

//             <ListGroupItem>
//               <h2>Order Items</h2>
          
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroupItem key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.images?.[0]?.url}
//                             alt={item.title}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.title}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                          {item.price}
//                         </Col>
//                       </Row>
//                     </ListGroupItem>
//                   ))}
//                 </ListGroup>

//             </ListGroupItem>
//           </ListGroup>
//         </Col>

//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroupItem>
//                 <h2>Order Summary</h2>
//               </ListGroupItem>
//               <ListGroupItem>
//                 <Row>
              
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroupItem>

             
//               <ListGroupItem>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroupItem>

//               <ListGroupItem>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroupItem>
//               {/* {!order.isPaid && (
//                 <ListGroupItem>
//                   {loadingPay && <Loader />}
//                   {!sdkReady ? (
//                     <Loader />
//                   ) : (
//                     <PayPalButton
//                       options={{
//                         currency: "USD",
//                         clientId:
//                           "ARRyN3gdniItyzberuDf06e76s6ZAetnooOAQnf8YLqJ9nqinU3yuxIwg78ePuKi7fIB7EeRcv-ZOJvQ",
//                       }}
//                       amount={order.totalPrice}
//                       onSuccess={successPaymentHandler}
//                     />
//                   )}
//                 </ListGroupItem>
//               )} */}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//       </Container>
//     </main>
//   );
// };

// export default OrderScreen;
