import express from 'express';

import todoRouter from '@/routes/todo';
import headerRouter from '@/routes/header';
import projectRouter from '@/routes/project';

const routes = express.Router();

routes.use('/todo', todoRouter);
routes.use('/header', headerRouter);
routes.use('/project', projectRouter);

export default routes;
