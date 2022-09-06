import express from 'express';

import todoRouter from '@/routes/todo';
import webpushRouter from '@/routes/webpush';
import authRouter from '@/routes/auth';
import locationRouter from './location';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/webpush', webpushRouter);
routes.use('/auth', authRouter);
routes.use('/location', locationRouter);

export default routes;
