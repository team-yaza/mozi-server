import express from 'express';

import todoRouter from '@/routes/todo';
import areaRouter from '@/routes/area';
import headerRouter from '@/routes/header';
import projectRouter from '@/routes/project';
import webpushRouter from '@/routes/webpush';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/area', areaRouter);
routes.use('/header', headerRouter);
routes.use('/project', projectRouter);
routes.use('/webpush', webpushRouter);

export default routes;
