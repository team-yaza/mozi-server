import express from 'express';
// import loader from './loaders';

// import loader from '@loaders';

const startSever = () => {
  const app = express();
  app.listen(3000, () => console.log('server started'));
};

startSever();
