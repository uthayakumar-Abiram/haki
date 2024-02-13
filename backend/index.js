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
dbConnect()
app.use(express.json());
app.use(express.urlencoded( {extended: true }))
app.use(cookieParser())
app.use("/api/users",userRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/product", gameRoutes);
app.use("/api/upload", uploadRouter);
app.get("/",(req,res) => res.send("server is ready"));



app.use(notFound)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
}) 

