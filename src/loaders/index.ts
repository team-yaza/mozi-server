import express from 'express';

import expressLoader from '@/loaders/express';
import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';
import promLoader from './prom';

const loader = async (app: express.Application) => {
  expressLoader(app);
  await sequelizeLoader();
  promLoader(app);
  routesLoader(app);
};

export default loader;
