import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import * as Sentry from '@sentry/node';
import { ZodError } from 'zod';

import routes from '@/routes';

export const routesLoader = (app: express.Application) => {
  app.use('/api/v1', routes);

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Page not found');
  });

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json(err);
    }

    if (err instanceof HttpError) {
      return res.status(err.status).json(err);
    }

    return res.status(500).json(err);
  });
};
