import express from 'express';
import stripePackage from "stripe";
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = stripePackage(process.env.STRIPE_KEY);

const makePayment = async (req, res) => {
  try {
    const { orderItems,userInfo ,orderId ,total} = req.body;
    
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ error: "Invalid or empty order items" });
    }

    const customer = await stripe.customers.create({
      metadata: {
        order: JSON.stringify(req.body.orderItems),
        user: req.body.userInfo._id,
        orderID:req.body.orderId,
        total:req.body.total
      },
    });
  
    const line_items = req.body.orderItems.map((item) => {
      return {
        price_data: {
          currency: "lkr",
          product_data: {
            name: item.title,
            images: [item.images?.[0]?.url]
          },
          unit_amount: total * 100,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `http://localhost:3000/profile`,
      cancel_url: `http://localhost:3000/Cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ error: 'An error occurred during payment processing.' });
  }
};

export {makePayment}

