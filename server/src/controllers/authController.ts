import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Validation Schemas
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // Strict Password Rule: Min 8 chars, 1 number, 1 special char
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character (!@#$)"),
  role: z.enum(['user', 'organizer']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Generate JWT Token (Set to 1 YEAR)
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '365d', // <--- Changed from 30d to 365d
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = registerSchema.parse(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    }
  } catch (error: any) {
    if (error.errors) {
       // Return Zod validation error
       return res.status(400).json({ message: error.errors[0].message, errors: error.errors });
    }
    res.status(400).json({ message: 'Invalid user data', error });
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });

    // Check password
    // @ts-ignore
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid inputs', error });
  }
};