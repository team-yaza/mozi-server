import 'dotenv/config';
import express from 'express';
import webpush from 'web-push';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import loader from '@/loaders';
import logger from '@/utils/logger';

const publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
const privateVapidKey = 'QNapwA1rlszq7UdCqLo5s5aORi5jAAlCEFMEfZaw4tU';

webpush.setVapidDetails('mailto:leehj0110@kakao.com', publicVapidKey, privateVapidKey);

const getServer = async () => {
  const app = express();

  Sentry.init({
    dsn: 'https://48e5185ee9804737a8899675d69b1d32@o4503968160481280.ingest.sentry.io/4503987021676544',
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

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
