import express, { Request, Response, NextFunction } from 'express';
import routes from '@/routes';
import createHttpError, { HttpError } from 'http-errors';

export const routesLoader = (app: express.Application) => {
  app.use('/api/v1', routes);

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound('No such page'));
  });

  // eslint-disable-next-line
  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json(err);
  });
};
