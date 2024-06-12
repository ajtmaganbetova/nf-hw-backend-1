import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/Auth';
import eventRoutes from './routes/events';


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URL as string;

console.log(mongoURI)

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of the default 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds (or as needed)
} as ConnectOptions).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
