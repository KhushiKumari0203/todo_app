// ✅ FILE: src/app.ts
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes); // For login/register

export default app;
