import mongoose from 'mongoose';

const mongooseLoader = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mozi');
  console.log('mongodb connected');
};

export default mongooseLoader;
