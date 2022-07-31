import express, { Request, Response } from 'express';
import cors from 'cors';

import routes from '@/routes';

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const options: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(options));

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    }),
  );

  app.use('/api/v1', routes);
  app.use('/', (_, res: Response) => res.send('hello mozi'));
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
  });
};

export default expressLoader;
