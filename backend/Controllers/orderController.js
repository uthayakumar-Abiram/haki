import { request } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

// @desc  Create a new Order
// @route POST /api/order
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;


  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});



// @desc  GET Order by ID
// @route POST /api/order/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name  email')
  if(order){
    res.json(order)
  }
  else{
    request.status(404)
    throw new Error('Order not found')
  }
});



// @desc  Update Order to paid
// @route GET /api/order/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time:req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  }
  else{
    request.status(404)
    throw new Error('Order not found')
  }
}); 




// @desc  GET logged in user orders
// @route GET /api/order/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders)

});



export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
