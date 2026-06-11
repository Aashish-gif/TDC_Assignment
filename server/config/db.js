import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    console.error('CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
    console.error('Please ensure MONGO_URI is set in your Render dashboard.');
    process.exit(1);
  }

  try {
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MONGODB CONNECTION ERROR: ${error.message}`);
    console.error('Check if your IP address is whitelisted in MongoDB Atlas or if the credentials are correct.');
    process.exit(1);
  }
};

export default connectDB;
