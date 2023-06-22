import express from 'express';
import { isOwnWorkday, verifyToken } from '../middleware/auth.js';
import {
  addCommentByWorkdayId,
  updateCommentById,
  deleteCommentById,
} from '../controllers/commentController.js';

const router = express.Router();

// Create
router.post('/:id', verifyToken, isOwnWorkday, addCommentByWorkdayId);

// Read

// Update
router.patch('/:id', verifyToken, isOwnWorkday, updateCommentById);

// Delete
router.delete('/:id', verifyToken, isOwnWorkday, deleteCommentById);

export default router;
