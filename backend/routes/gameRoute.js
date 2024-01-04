import express from"express";
import {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from"../Controllers/gameController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/rating", protect, rating);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.get("/", getAllProduct);

export default router;