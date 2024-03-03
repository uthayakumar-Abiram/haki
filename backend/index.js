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

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
dbConnect()

app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
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

