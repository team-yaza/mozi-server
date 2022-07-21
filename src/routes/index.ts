import express from 'express';

import todoRouter from '@/routes/todo';
import areaRouter from '@/routes/area';
import headerRouter from '@/routes/header';
import projectRouter from '@/routes/project';

const routes = express.Router();

routes.use('/todos', todoRouter);
routes.use('/area', areaRouter);
routes.use('/header', headerRouter);
routes.use('/project', projectRouter);

export default routes;
