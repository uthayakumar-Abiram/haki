import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders
} from "../Controllers/orderController.js";
import { protect ,isAdmin} from "../middleware/authMiddleware.js";
router.route("/abi").get(protect, getOrders);
router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);


export default router;
