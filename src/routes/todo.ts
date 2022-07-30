import express from 'express';

import {
  getAllTodosHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodoHandler,
} from '@/controllers/todo';

import asyncHandler from '@/utils/asyncHandler';

const todoRouter = express.Router();

todoRouter.get('/', asyncHandler(getAllTodosHandler));
todoRouter.get('/:id', asyncHandler(getTodoHandler));
todoRouter.post('/', asyncHandler(createTodoHandler));
todoRouter.delete('/:id', asyncHandler(deleteTodoHandler));
todoRouter.patch('/:id', asyncHandler(updateTodoHandler));

export default todoRouter;
