import React, { useEffect }  from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { redirect, useNavigate } from "react-router-dom";


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const navigate = useNavigate();
    
const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;
useEffect(() => {
    if (!userInfo && userInfo.role === "admin") {
        navigate("/login")
    } 
  });
 

  return <Nav className="justify-content-center mb-4">
    <NavItem>
     
       {
            step1 ? (
                <LinkContainer to='/login'>
                    <NavLink>Sign In</NavLink>
                </LinkContainer>
            ) : <NavLink disabled>Sign In</NavLink>
        }
    </NavItem>
   
    <NavItem>
        {
            step2 ? (
                <LinkContainer to='/payment'>
                    <NavLink>Payment</NavLink>
                </LinkContainer>
            ) : <NavLink disabled>Payment</NavLink>
        }
    </NavItem>
    <NavItem>
        {
            step3 ? (
                <LinkContainer to='/placeOrder'>
                    <NavLink>Place Order</NavLink>
                </LinkContainer>
            ) : <NavLink disabled>Place Order</NavLink>
        }
    </NavItem>
  </Nav>
};

export default CheckoutSteps;
