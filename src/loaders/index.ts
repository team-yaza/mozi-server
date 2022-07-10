import 'dotenv/config';
import express from 'express';

import expressLoader from './express';
import mongooseLoader from './mongo';

const loader = async (app: express.Application) => {
  expressLoader(app);

  await mongooseLoader();
};

export default loader;
