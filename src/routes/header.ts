import express from 'express';

import { getAllTodosHandler, createTodoHandler } from '@/controllers/todo';

const headerRouter = express.Router();

headerRouter.get('/all', getAllTodosHandler);
headerRouter.post('/create', createTodoHandler);

export default headerRouter;
