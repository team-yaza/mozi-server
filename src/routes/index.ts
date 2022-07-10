import express from 'express';

import todoRouter from './todo';

const routes = express.Router();

routes.use('/todo', todoRouter);

export default routes;
