import express from 'express';
import {
  addWhitelist,
  getWhitelist,
  getWhitelistById,
  updateWhitelistById,
  deleteWhitelistBId,
} from '../controllers/whitelistController.js';
import { isAdmin, verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create
router.post('/', verifyToken, isAdmin, addWhitelist);

// Read
router.get('/', verifyToken, isAdmin, getWhitelist);
router.get('/:id', verifyToken, isAdmin, getWhitelistById);

// Update
router.patch('/:id', verifyToken, isAdmin, updateWhitelistById);

// Delete
router.delete('/:id', verifyToken, isAdmin, deleteWhitelistBId);

export default router;
