import express, { Request, Response } from 'express';
import routes from '@/routes';

export const routesLoader = (app: express.Application) => {
  app.use('/api/v1', routes);
  app.use('/', (_, res: Response) => res.send('hello mozi'));
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
  });
};
