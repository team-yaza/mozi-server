import 'dotenv/config';
import express from 'express';

import expressLoader from '@/loaders/express';
import passportLoader from '@/loaders/passport';
import mongooseLoader from '@/loaders/mongo';
import { routesLoader } from './routes';

const loader = async (app: express.Application) => {
  expressLoader(app);
  passportLoader(app);
  routesLoader(app);

  await mongooseLoader();
};

export default loader;
