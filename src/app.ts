import express from 'express';
import loader from '@/loaders';

export const app = async () => {
  const app = express();
  await loader(app);
  return app;
};
