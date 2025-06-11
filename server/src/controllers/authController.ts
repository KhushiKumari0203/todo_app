// FILE: src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string; // hashed password
}

// In-memory user storage (for demo/testing)
const users: User[] = [];

export const login = async (req: Request, res: Response) => {
  console.log("🔐 Received login request:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  let user = users.find((u) => u.username === username);

  if (!user) {
    // Auto-register for testing/demo only
    const hashedPassword = await bcrypt.hash(password, 10);
    user = { username, password: hashedPassword };
    users.push(user);
    console.log(`✅ Auto-registered new user: ${username}`);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.log(`❌ Invalid password attempt for user: ${username}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });

  console.log(`✅ Login successful for user: ${username}`);
  res.status(200).json({ message: 'Login successful', token });
};

export const register = async (req: Request, res: Response) => {
  console.log("📝 Received register request:", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  console.log(`✅ Registered new user: ${username}`);
  res.status(201).json({ message: 'User registered successfully' });
};
