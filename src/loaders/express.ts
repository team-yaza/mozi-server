import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

import routes from '@/routes';

const options: cors.CorsOptions = {
  origin: '*',
  credentials: true,
};

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors(options));

  app.use('/static', express.static(path.join(__dirname, '../../public')));
  app.use('/api/v1', routes);
  app.use('/', (_, res: Response) => res.send('hello mozi'));
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
  });
};

export default expressLoader;
