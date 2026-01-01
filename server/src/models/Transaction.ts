import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g. "Spotify", "Freelance Gig"
  amount: { type: Number, required: true }, // e.g. 5000
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, default: 'General' }, // e.g. "Food", "Tech"
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;