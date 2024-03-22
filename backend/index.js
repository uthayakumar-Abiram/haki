import dotenv from 'dotenv'
import express from 'express'
import { notFound,errorHandler} from "./middleware/errorMiddleware.js";
import cookieParser from 'cookie-parser';
import dbConnect from "./utils/dbConnect.js";

const app = express();
dotenv.config();
const port =process.env.PORT
import userRoutes from "./routes/userRoutes.js"
import gameRoutes from "./routes/gameRoute.js"
import uploadRouter from "./routes/uploadRoute.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymantRoute.js"
import path from 'path';
import stripePackage from "stripe";
import Order from "./models/Order.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
dbConnect()

app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
const stripe = stripePackage(process.env.STRIPE_KEY);


const endpointSecret = process.env.END_POINT_SECRET

app.post('/api/pay/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  
  let event;
  let data;
  let eventType;
  try {
   
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
   
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log(err);
    return;
  }
  
      data = event.data.object;
      eventType = event.type;



      if (eventType === "checkout.session.completed") {
    
        stripe.customers
          .retrieve(data.customer)
          .then(async (customer) => {
            try {
              const userId = customer.metadata.user;
              const orderId =customer.metadata.orderID
              
              console.log(orderId)
              const order = await Order.findOne( { _id:orderId } );
          
              if (order) {
                order.isPaid = true;
                order.paidAt = Date.now()
                const updatedOrder = await order.save(); // Corrected here
                return updatedOrder;
              } else {
                throw new Error('Order not found');
              }
            } catch (error) {
              console.error('Error updating order:', error.message); // Improved error logging
              throw error; // Rethrow the error for handling in the caller function
            }
          })
          .catch((err) => console.log(err.message));
        }
      // Return a 200 response to acknowledge receipt of the event
      response.send().end();
    });
          
      




app.use(express.json());
app.use(express.urlencoded( {extended: true }))
app.use(cookieParser())

app.use("/api/pay",paymentRoutes)
app.use("/api/users",userRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/product", gameRoutes);
app.use("/api/upload", uploadRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}
app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
}) 

