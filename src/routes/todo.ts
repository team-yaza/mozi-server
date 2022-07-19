import express from 'express';

import { getAllTodosHandler, createTodoHandler, deleteTodoHandler, updateTodoHandler } from '@/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/all', getAllTodosHandler);
todoRouter.post('/create', createTodoHandler);
todoRouter.delete('/', deleteTodoHandler);
todoRouter.patch('/', updateTodoHandler);

export default todoRouter;
