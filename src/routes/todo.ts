import express from 'express';

import {
  getAllTodosHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodosHandler,
} from '@/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', getAllTodosHandler);
todoRouter.get('/:id', getTodosHandler);
todoRouter.post('/', createTodoHandler);
todoRouter.delete('/', deleteTodoHandler);
todoRouter.patch('/', updateTodoHandler);

export default todoRouter;
