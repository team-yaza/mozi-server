import express, { Request, Response, NextFunction } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import * as Sentry from '@sentry/node';
import { ZodError } from 'zod';

import routes from '@/routes';

export const routesLoader = (app: express.Application) => {
  app.use('/api/v1', routes);

  app.use('/', (_: Request, __: Response, next: NextFunction) => {
    next(new createHttpError.NotFound('No such page'));
  });

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: HttpError | ZodError, _: Request, res: Response, __: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json(err);
    }

    if (!('status' in err)) {
      return res.status(500).json(err);
    }

    return res.status(err.status).json(err);
  });
};
