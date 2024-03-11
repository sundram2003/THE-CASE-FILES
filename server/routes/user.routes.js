import express from 'express';
import { registerController, sendOtp, loginController, getAllUserDeatils } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();



router.post('/register', registerController);
router.post('/sendotp', sendOtp);
router.post('/login', loginController);
router.get('/getAllUserDetails', auth, getAllUserDeatils);

export default router;