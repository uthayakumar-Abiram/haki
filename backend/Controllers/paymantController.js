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
      
      success_url: `http://localhost:5500/CheckoutSuccess`,
      cancel_url: `http://localhost:5500/Cart`,
    });
  
    res.send({ url: session.url });
  }
    
}

export {makePayment}