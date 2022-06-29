import 'dotenv/config';
import express from 'express';

import expressLoader from './express';

const loader = (app: express.Application) => {
  expressLoader(app);
};

export default loader;
