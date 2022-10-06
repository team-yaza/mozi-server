import express from 'express';

import {
  getAllTodosHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodoHandler,
  deleteAllTodosHandler,
} from '@/controllers/todo';

import asyncHandler from '@/utils/asyncHandler';
import { uuidHandler } from '@/middlewares/todo';

const todoRouter = express.Router();

todoRouter.get('/', asyncHandler(getAllTodosHandler));
todoRouter.get('/:id', uuidHandler, asyncHandler(getTodoHandler));
todoRouter.post('/', asyncHandler(createTodoHandler));
todoRouter.delete('/all', asyncHandler(deleteAllTodosHandler));
todoRouter.delete('/:id', uuidHandler, asyncHandler(deleteTodoHandler));
todoRouter.patch('/:id', uuidHandler, asyncHandler(updateTodoHandler));

export default todoRouter;
