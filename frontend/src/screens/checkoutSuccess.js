import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CheckoutSuccess = () => {
 

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support Haki</strong>
      </p>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;