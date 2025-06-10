import express from 'express';
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
// import { authenticate } from '../middleware/authMiddleware'; // 🔒 Disabled for testing

const router = express.Router();
// router.use(authenticate); // 🔓 Temporarily disabled for testing without login

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
