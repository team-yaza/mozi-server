import express from 'express';
import webpush from 'web-push';

import loader from '@/loaders';
import logger from '@/utils/logger';

const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
const privateVapidKey = 'QNapwA1rlszq7UdCqLo5s5aORi5jAAlCEFMEfZaw4tU';

webpush.setVapidDetails('mailto:leehj0110@kakao.com', publicVapidKey, privateVapidKey);

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
