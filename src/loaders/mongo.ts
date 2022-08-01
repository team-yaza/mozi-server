import mongoose from 'mongoose';

const mongooseLoader = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mozi');
  console.log('mongodb connected');

  mongoose.connection.on('error', (error) => {
    console.error(error);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');

    process.exit(0);
  });
};

export default mongooseLoader;
