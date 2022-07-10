import 'dotenv/config';
import express from 'express';

import expressLoader from '@/loaders/express';
import mongooseLoader from '@/loaders/mongo';

const loader = async (app: express.Application) => {
  expressLoader(app);

  await mongooseLoader();
};

export default loader;
