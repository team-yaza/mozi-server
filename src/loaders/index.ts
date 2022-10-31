import express from 'express';

import expressLoader from '@/loaders/express';
import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';
import promLoader from './prom';
import dotenv from 'dotenv';

const loader = async (app: express.Application) => {
  dotenv.config();
  expressLoader(app);
  await sequelizeLoader();
  promLoader(app);
  routesLoader(app);
};

export default loader;
