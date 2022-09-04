import 'dotenv/config';
import express from 'express';

import expressLoader from '@/loaders/express';
import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';
import { passportLoader } from './passport';

const loader = async (app: express.Application) => {
  expressLoader(app);
  await sequelizeLoader();
  passportLoader(app);

  routesLoader(app);
};

export default loader;
