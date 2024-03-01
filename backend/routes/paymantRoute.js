import express from  'express';
import { makePayment} from'../Controllers/paymantController.js';
import { protect,isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/checkout').post(makePayment);



export default router;