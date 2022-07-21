import express from 'express';

import {
  getAllTodosHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodoHandler,
} from '@/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', getAllTodosHandler);
todoRouter.get('/:id', getTodoHandler);
todoRouter.post('/', createTodoHandler);
todoRouter.delete('/:id', deleteTodoHandler);
todoRouter.patch('/', updateTodoHandler);

export default todoRouter;
