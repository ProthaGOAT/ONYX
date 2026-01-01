import express from 'express';
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected
router.route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router.delete('/:id', protect, deleteTransaction);

export default router;