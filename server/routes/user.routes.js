import express from 'express';
import { registerController, sendOtp, loginController, getAllUserDeatils } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.js';
import { followUser, getUserByUserName, unfollowUser } from '../controllers/user.controller.js';
const router = express.Router();



router.post('/register', registerController);
router.post('/sendotp', sendOtp);
router.post('/login', loginController);
router.get('/getAllUserDetails', auth, getAllUserDeatils);
router.put('/followUser', auth, followUser);
router.put('/unfollowUser', auth, unfollowUser);
router.get('/getUserByUsername/:username', auth, getUserByUserName);
export default router;