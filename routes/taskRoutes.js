import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateTask, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.use(protect);

router.post('/', validateTask, handleValidationErrors, createTask);

router.get('/', getTasks);

router.get('/:id', getTaskById);

router.put('/:id', validateTask, handleValidationErrors, updateTask);


router.delete('/:id', deleteTask);

export default router;
