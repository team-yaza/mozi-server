import express from 'express';

import loader from '@/loaders';
import logger from '@/utils/logger';

const getServer = async () => {
  const app = express();
  await loader(app);
  return app;
};

const startSever = async () => {
  const app = await getServer();

  app.listen(3001, () => logger.info('server started'));
};

startSever();

process.on('unhandledRejection', (error) => console.log(error));
process.on('uncaughtException', (error) => console.log(error));
