import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  user?: any;
}

// Get all User's Transactions
export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    // Find transactions for THIS user only, sort by newest
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add Transaction
export const addTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount: Number(amount),
      type,
      category,
      date
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Delete Transaction
export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.status(404).json({ message: 'Not found' });

    // Make sure user owns the transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await transaction.deleteOne();
    res.json({ message: 'Removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};