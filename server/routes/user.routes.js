import express from 'express';
import { registerController, sendOtp, loginController, getAllUserDeatils, resetPasswordToken, resetPassword, changePassword } from '../controllers/auth.controller.js';
import { auth, isAdmin } from '../middlewares/auth.js';
import { addModerator, deleteAccount, followUser, getUserAnalytics, getUserByUserName, removeModerator, unfollowUser, updateProfile } from '../controllers/user.controller.js';
const router = express.Router();



router.post('/register', registerController);
router.post('/sendotp', sendOtp);
router.post('/login', loginController);
router.get('/getAllUserDetails', auth, getAllUserDeatils);

//user analytics
router.get('/userAnalytics', auth, getUserAnalytics);

router.put('/followUser', auth, followUser);
router.put('/unfollowUser', auth, unfollowUser);
router.get('/getUserByUsername/:username', auth, getUserByUserName);
router.put('/addModerator', auth, isAdmin, addModerator);
router.put('/removeModerator', auth, isAdmin, removeModerator);
router.delete('/deleteAccount', auth, deleteAccount);

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);
//update profile
router.put('/updateProfile', auth, updateProfile);
//change password
router.post('/changePassword', auth, changePassword);
export default router;