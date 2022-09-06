import express from 'express';

import expressLoader from '@/loaders/express';
import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';

const loader = async (app: express.Application) => {
  expressLoader(app);
  await sequelizeLoader();

  routesLoader(app);
};

export default loader;
