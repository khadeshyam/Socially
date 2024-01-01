import  Express  from 'express';
import { login,register,logout,googleAuth,verifyEmail,forgotPassword,resetPassword  } from '../controllers/auth.js';

const router = Express.Router();

router.post('/login',login);
router.post('/register',register);
router.post('/verify-email',verifyEmail);
router.post('/google',googleAuth);
router.post('/logout',logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;