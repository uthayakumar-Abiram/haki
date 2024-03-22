import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import Productlist from "./screens/Productlist";
import CheckoutSuccess from"./screens/checkoutSuccess"
import  NotFound from "./screens/404/notfound"
import  OrderListScreen from "./screens/OrderList"


import "./index.css"

const App = () => {
  return (
    <Router>
     
   
     <Header />
          <Routes>
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/admin/userList" element={<UserListScreen />} />
            <Route path="/admin/productAdd" element={<Productlist />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/admin/OrderList" element={<OrderListScreen/>}/>
            <Route  path="/CheckoutSuccess" element={<CheckoutSuccess />}/>
            <Route path="*" element={<NotFound/>}/>
           
          </Routes>
        

      <Footer />
    </Router>
  );
};

export default App;
