// FILE: src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string; // hashed password
}

// Simulated user database (in-memory)
const users: User[] = [];

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  let user = users.find((u) => u.username === username);

  // Auto-register if user not found
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = { username, password: hashedPassword };
    users.push(user);
    console.log(`✅ Auto-registered new user: ${username}`);
  }

  // Validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
};
