import express from 'express';

import baseRouter from '@routes/index';

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', baseRouter);
};

export default expressLoader;
