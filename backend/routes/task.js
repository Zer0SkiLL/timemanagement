import express from 'express';
import { isOwnTask, verifyToken } from '../middleware/auth.js';

import {
  createTask,
  getTaskByUser,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from '../controllers/taskController.js';

const router = express.Router();

// Create
router.post('/', verifyToken, createTask);

// Read
router.get('/', verifyToken, getTaskByUser);
router.get('/:id', verifyToken, isOwnTask, getTaskById);

// Update
router.patch('/:id', verifyToken, isOwnTask, updateTaskById);

// Delete
router.delete('/:id', verifyToken, isOwnTask, deleteTaskById);

export default router;
