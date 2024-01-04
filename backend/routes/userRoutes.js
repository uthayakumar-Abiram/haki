import express from 'express';
const router = express. Router();
import { authUser,registerUser,getUserProfile,logoutUser,updateUserProfile,loginAdmin
} from '../Controllers/userController.js';
import { protect,isAdmin } from '../middleware/authMiddleware.js';
router.post('/reg', registerUser);
router.post('/auth', authUser);
router.post("/admin-login",loginAdmin);
router.post('/logout', logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/admin').get(protect,isAdmin)
export default router;