import express from 'express';

import loader from '@/loaders';

const startSever = () => {
  const app = express();

  loader(app);

  app.listen(3001, () => console.log('server started'));
};

startSever();
