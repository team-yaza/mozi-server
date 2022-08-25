import express from 'express';

import todoRouter from '@/routes/todo';
import webpushRouter from '@/routes/webpush';
import alarmRouter from '@/routes/alarm';
import authRouter from '@/routes/auth';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/webpush', webpushRouter);
routes.use('/alarm', alarmRouter);
routes.use('/auth', authRouter);

export default routes;
