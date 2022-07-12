import express from 'express';

import { getAllTodosHandler, createTodoHandler } from '@/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/all', getAllTodosHandler);
todoRouter.post('/create', createTodoHandler);

export default todoRouter;
