import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes'; // <--- UPDATED

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes); // <--- UPDATED (Note the URL change)

app.listen(PORT, () => {
  console.log(`ONYX Server running on port ${PORT}`);
});