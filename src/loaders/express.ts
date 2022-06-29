import express from 'express';

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export default expressLoader;
