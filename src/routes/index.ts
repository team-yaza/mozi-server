import express from 'express';

import todoRouter from '@/routes/todo';
import projectRouter from '@/routes/project';

const routes = express.Router();

routes.use('/todo', todoRouter);
routes.use('/project', projectRouter);

export default routes;
