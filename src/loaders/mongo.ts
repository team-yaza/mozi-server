import mongoose from 'mongoose';
import config from '@/config';
import logger from '@/utils/logger';

const mongooseLoader = async () => {
  await mongoose.connect(process.env.NODE_ENV === 'development' ? 'mongodb://127.0.0.1:27017/mozi' : config.mongo);
  logger.info('mongodb connected');

  mongoose.connection.on('error', (error) => {
    console.error(error);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');

    process.exit(0);
  });
};

export default mongooseLoader;
