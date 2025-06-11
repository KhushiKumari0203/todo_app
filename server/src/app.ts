import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// ✅ JSON and CORS middleware must be first
app.use(cors());
app.use(express.json());

// ✅ Basic logging that does NOT consume body
app.use((req, _res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  console.log('📦 Parsed Request Body:', req.body);
  next();
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (_req, res) => {
  res.send('Server is live!');
});

export default app;
