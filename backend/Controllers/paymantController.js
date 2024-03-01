// import {catchAsyncError} from "../middleware/catchAsyncError.js";
// import stripe from'stripe'
// import dotenv from 'dotenv'
// dotenv.config();
// const processPayment  = catchAsyncError(async(req, res, next) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "usd",
//         description: "TEST PAYMENT",
//         metadata: { integration_check: "accept_payment"},
//     })

//     res.status(200).json({
//         success: true,
//         client_secret: paymentIntent.client_secret
//     })
// })

// const sendStripeApi  = catchAsyncError(async(req, res, next) => {
//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY
//     })
// })
// export {sendStripeApi ,processPayment  }

import stripePackage from "stripe";
import dotenv from 'dotenv'
dotenv.config();
const stripe = stripePackage(process.env.STRIPE_KEY);

const makePayment =  async (req, res) =>{
  const customer = await stripe.customers.create({
    metadata: {
      cart: JSON.stringify(req.body.orderItems),
    },
  })

  {
    const session = await stripe.checkout.sessions.create({
      
      line_items: [
        {
          price_data: {
            currency: 'lkr',
            product_data: {
              name: 'Haki',
            },
            unit_amount: 200000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/CheckoutSuccess`,
      cancel_url: `${process.env.CLIENT_URL}/Cart`,
    });
  
    res.send({ url: session.url });
  }
    // try {
    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ["card"],
    //       mode: "payment",
    //       line_items: req.body.items.map(item => {
           
    //         return {
    //           price_data: {
    //             currency: "usd",
    //             product_data: {
    //               name: "haki",
    //             },
    //             unit_amount: 400*100,
    //           },
    //           quantity: 1,
    //         }
    //       }),
    //       success_url: `${process.env.CLIENT_URL}/`,
    //       cancel_url: `${process.env.CLIENT_URL}/`,
    //     })
    //     // res.json({ url: session.url })
    //   } catch (e) {
    //     res.status(500).json({ error: e.message })
    //   }
}

export {makePayment}