import express from 'express';

import expressLoader from '@/loaders/express';
import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';
import promLoader from './prom';
import dotenv from 'dotenv';
import { RegisterRoutes } from '../../build/routes';

const loader = async (app: express.Application) => {
  dotenv.config();
  expressLoader(app);
  await sequelizeLoader();
  promLoader(app);
  routesLoader(app);
  RegisterRoutes(app);
};

export default loader;
