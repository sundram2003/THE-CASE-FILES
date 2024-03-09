import express from 'express';
import { registerController, sendOtp, loginController } from '../controllers/auth.controller.js';
const router = express.Router();



router.post('/register', registerController);
router.post('/sendotp', sendOtp);
router.post('/login', loginController);


export default router;