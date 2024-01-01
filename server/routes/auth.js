import  Express  from 'express';
import { login,register,logout,googleAuth,verifyEmail } from '../controllers/auth.js';

const router = Express.Router();

router.post('/login',login);
router.post('/register',register);
router.post('/verify-email',verifyEmail);
router.post('/google',googleAuth);
router.post('/logout',logout);

export default router;