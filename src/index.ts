import express from 'express';

import loader from '@loaders/index';

const startSever = async () => {
  const app = express();

  await loader(app);

  app.listen(3000, () => console.log('server started'));
};

startSever();
