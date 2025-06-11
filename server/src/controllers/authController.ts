// FILE: src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string; // hashed password
}

// In-memory user storage (for demo/testing only — not persistent)
const users: User[] = [];

export const login = async (req: Request, res: Response) => {
  console.log("🔐 Received login request:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find((u) => u.username === username);

  if (!user) {
    console.log(`❌ User not found: ${username}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.log(`❌ Invalid password for user: ${username}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  console.log(`✅ Login successful for user: ${username}`);
  return res.status(200).json({ message: 'Login successful', token });
};

export const register = async (req: Request, res: Response) => {
  console.log("📝 Received register request:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    console.log(`⚠️ Registration attempt for existing user: ${username}`);
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  console.log(`✅ Registered new user: ${username}`);
  return res.status(201).json({ message: 'User registered successfully' });
};
