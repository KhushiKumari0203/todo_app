// src/app.ts

import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// ✅ MIDDLEWARE ORDER MATTERS
app.use(cors());
app.use(express.json()); // <-- Make sure this comes before routes

// ✅ DEBUG: Log raw body
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      console.log('📦 Raw Request Body:', data);
      next();
    });
  } else {
    next();
  }
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server is live!');
});

export default app;
