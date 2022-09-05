import express from 'express';

import todoRouter from '@/routes/todo';
import webpushRouter from '@/routes/webpush';
import authRouter from '@/routes/auth';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/webpush', webpushRouter);
routes.use('/auth', authRouter);

export default routes;
