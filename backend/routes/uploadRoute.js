import express from"express";
import { uploadImages, deleteImages } from "../Controllers/uploadImgController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/image.js";
const router = express.Router();

router.post(
  "/",
  protect,
  isAdmin,
  upload.array("images", 1),
  uploadImages
);

router.delete("/delete-img/:id",protect, isAdmin, deleteImages);

export default router;