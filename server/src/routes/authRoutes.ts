import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

// Routes
router.post('/login', login);
router.post('/register', register);

// Default export
export default router;
