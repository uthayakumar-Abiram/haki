import axios from "axios";
import { useSelector } from "react-redux";
  
const PayButton = ({ orderItems ,orderId ,total}) => {
  const user = useSelector((state) => state.auth);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
console.log(orderId)
  const handleCheckout = () => {
    console.log({orderItems})
    axios .post(`/api/pay/checkout`, {
        orderItems,userInfo  ,orderId ,total
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;