
import { uploadImages, deleteImages } from "../Controllers/uploadImgController.js";
import { upload } from "../middleware/image.js";
import express from"express";
import {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  rating,
} from"../Controllers/gameController.js";
import {  getBill } from "../Controllers/ appController.js";

import { isAdmin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, isAdmin,upload.array("images", 1),
 createProduct,uploadImages);

 router.post("/bill", getBill)
router.get("/:id", getaProduct);
router.put("/rating", protect, rating);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.get("/", getAllProduct);

export default router;