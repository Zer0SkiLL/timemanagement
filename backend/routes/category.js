import express from 'express';
import { isOwnCategory, verifyToken } from '../middleware/auth.js';
import {
  createCategory,
  deleteCategoryBId,
  getCategoryById,
  getCategoryByUser,
  getCategoryAndTaskByUser,
  updateCategoryById,
} from '../controllers/categoryController.js';

const router = express.Router();

// Create
router.post('/', verifyToken, createCategory);

// Read
router.get('/', verifyToken, getCategoryByUser);
router.get('/task', verifyToken, getCategoryAndTaskByUser);
router.get('/:id', verifyToken, isOwnCategory, getCategoryById);

// Update
router.patch('/:id', verifyToken, isOwnCategory, updateCategoryById);

// Delete
router.delete('/:id', verifyToken, isOwnCategory, deleteCategoryBId);

export default router;
