import axios from "axios";
import { useSelector } from "react-redux";


  
const PayButton = ({ orderItems }) => {
  const user = useSelector((state) => state.auth);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleCheckout = () => {
    console.log(orderItems)
    axios .post(`/api/pay/checkout`, {
        orderItems,
           
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