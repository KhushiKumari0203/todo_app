// ✅ FILE: src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string; // hashed
}

const users: User[] = []; // This resets when the server restarts

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  let user = users.find((u) => u.username === username);

  // If user not found, auto-register
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = { username, password: hashedPassword };
    users.push(user);
    console.log(`✅ Auto-registered new user: ${username}`);
  }

  // Compare passwords
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate token
  const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
};
