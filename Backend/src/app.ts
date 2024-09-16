import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
// import multer from 'multer';
// import jwt from 'jsonwebtoken';
import userRouter from './Routes/userRouter';
import adminRouter from './Routes/adminRouter';

// Load environment variables
dotenv.config();

const app: Application = express();
const uploadDir = path.join(__dirname, 'uploads');

// Create upload directory if it does not exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

// Middleware
// app.use('/uploads', express.static(uploadDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/default-db')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err: Error) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
// app.use('/api/admin', adminRouter);

// Handle preflight requests
app.options('*', cors(corsOptions));

const PORT: number = parseInt(process.env.PORT || '3001', 10);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
