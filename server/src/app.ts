// FILE: src/app.ts

import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// ✅ Middleware: CORS and JSON body parser
app.use(cors());
app.use(express.json());

// ✅ Debug middleware to inspect body
app.use((req, res, next) => {
  console.log('📥 Incoming Request:', req.method, req.url);
  console.log('📦 Request Body:', req.body);
  next();
});

// ✅ Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Server is live!');
});

export default app;
