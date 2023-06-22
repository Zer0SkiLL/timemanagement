import express from 'express';
import { isOwnWorkday, isOwnWorkdayOrAdmin, verifyToken } from '../middleware/auth.js';
import {
  createWorkday,
  deleteWorkdayBId,
  getWorkdayById,
  getWorkdayToday,
  getWorkdayByUser,
} from '../controllers/workdayController.js';
import { addCommentByWorkdayId } from '../controllers/commentController.js';

const router = express.Router();

// Create
router.post('/', verifyToken, createWorkday);
router.post('/:id/comment', verifyToken, isOwnWorkday, addCommentByWorkdayId);

// Read
router.get('/today', verifyToken, getWorkdayToday);
router.get('/', verifyToken, getWorkdayByUser);
router.get('/:id', verifyToken, isOwnWorkday, getWorkdayById);

// Update

// Delete
router.delete('/:id', verifyToken, isOwnWorkdayOrAdmin, deleteWorkdayBId);

export default router;
