import express from 'express';

import { getAllTodosHandler, createTodoHandler, deleteTodoHandler } from '@/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/all', getAllTodosHandler);
todoRouter.post('/create', createTodoHandler);
todoRouter.delete('/', deleteTodoHandler);

export default todoRouter;
