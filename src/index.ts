import 'dotenv/config';
import express from 'express';
import webpush from 'web-push';

import loader from '@/loaders';
import logger from '@/utils/logger';

const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
const privateVapidKey = 'QNapwA1rlszq7UdCqLo5s5aORi5jAAlCEFMEfZaw4tU';

webpush.setVapidDetails('mailto:leehj0110@kakao.com', publicVapidKey, privateVapidKey);

const startSever = () => {
  const app = express();

  loader(app);

  app.listen(3001, () => logger.info('server started'));
};

startSever();
