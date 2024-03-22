import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_REQUEST
} from "../constants/orderConstants";
import { Axios } from "../utils";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        
      },
    };

    const { data } = await axios.post(`/api/order`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch,) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

     const { data } = await axios.get(`/api/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch,) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

     
      const config = {
        headers: {
          "Content-Type": "application/json",
          
        },
      };

      const { data } = await axios.put(
        `/api/order/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

   

    const { data } = await axios.get(`/api/order/myorders`);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
};



export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_ALL_REQUEST,
    });
   
    const { data } = await axios.get(`/api/order/abi`);

    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
