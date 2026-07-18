const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// ── CORS ── must be the FIRST middleware so headers are sent on every response,
// including error responses (500s from DB crash, etc.)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://evol-vit-website.vercel.app',
  'https://evolvit-frontend.vercel.app',
  'https://evolvit-testbackend.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors());

app.use(express.json());

// Connect to DB (non-blocking — server stays up even if DB is slow to connect)
connectDB();

// ── Routes ──
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/members', require('./routes/members'));

// Health check endpoint (useful for Render uptime monitoring)
app.get('/', (req, res) => res.json({ status: 'Evolvit backend is running 🚀' }));

// ── Global error handler ── always sends CORS headers even on 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));