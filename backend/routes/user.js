import express from 'express';
import { isAdmin, isOwnUser, isOwnUserOrAdmin, verifyToken } from '../middleware/auth.js';
import {
  deleteUserBId,
  getUser,
  getUserById,
  updateUserById,
  updateUserByIdAdmin,
} from '../controllers/userController.js';

const router = express.Router();

// Create

// Read
router.get('/', verifyToken, isAdmin, getUser);
router.get('/:id', verifyToken, isOwnUserOrAdmin, getUserById);

// Update
router.patch('/:id', verifyToken, isOwnUser, updateUserById);
router.patch('/:id', verifyToken, isAdmin, updateUserByIdAdmin);

// Delete
router.delete('/:id', verifyToken, isOwnUserOrAdmin, deleteUserBId);

export default router;
