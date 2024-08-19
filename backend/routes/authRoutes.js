import { Router } from 'express';
const router = Router();
import { registerUser } from '../controllers/authController.js';

router.post('/register', registerUser);

export default router;