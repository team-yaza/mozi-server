import express from 'express';
import cors from 'cors';

import routes from '@/routes';

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(options));

  app.use('/api', routes);
};

export default expressLoader;
