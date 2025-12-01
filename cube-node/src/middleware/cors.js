require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001', // For GraphQL playground and AdminJS
      process.env.BACKEND_URL, // Allow backend's own URL (for AdminJS on EC2)
    ].filter(Boolean); // Remove undefined values

    // Allow requests with no origin (like mobile apps, curl requests, or same-origin requests)
    if (!origin || origin === 'null') return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Set-Cookie'],
};

module.exports = cors(corsOptions);
