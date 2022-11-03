import express, { Request, Response, NextFunction } from 'express';

import expressLoader from '@/loaders/express';
// import { routesLoader } from './routes';
import sequelizeLoader from './sequelize';
import promLoader from './prom';
import dotenv from 'dotenv';

import { RegisterRoutes } from '../../build/routes';
import { ValidateError } from 'tsoa';
import { HttpError } from 'http-errors';
import { JsonWebTokenError } from 'jsonwebtoken';

const loader = async (app: express.Application) => {
  dotenv.config();
  expressLoader(app);
  await sequelizeLoader();
  promLoader(app);
  // routesLoader(app);
  RegisterRoutes(app);

  app.use(function notFoundHandler(_req, res: Response) {
    return res.status(404).send({
      message: 'Not Found',
    });
  });

  app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }

    if (err instanceof HttpError) {
      return res.status(err.status).json({
        message: err.message,
      });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json(err);
    }

    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    next();
  });
};

export default loader;
