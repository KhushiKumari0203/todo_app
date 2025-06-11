import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// ✅ MIDDLEWARE must be first
app.use(cors());
app.use(express.json()); // ✅ JSON parser - must be above logging or routes

// ✅ LOGGING middleware to debug raw body
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    console.log('📦 Raw Request Body:', body);
    try {
      const parsed = JSON.parse(body);
      console.log('✅ Parsed Request Body:', parsed); // 👈 This should match
    } catch (e) {
      console.log('❌ Could not parse body');
    }
    next();
  });
});

app.use('/auth', authRoutes);   // ✅ routes below middleware
app.use('/tasks', taskRoutes);

app.get('/', (_req, res) => {
  res.send('Server is live!');
});

export default app;
