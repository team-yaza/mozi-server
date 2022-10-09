import express from 'express';

import {
  getAllTodosHandler,
  createTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  getTodoHandler,
  deleteAllTodosHandler,
  forceDeleteTodoHandler,
} from '@/controllers/todo';

import asyncHandler from '@/utils/asyncHandler';
import { todoValidator, uuidValidator } from '@/middlewares/todo';

const todoRouter = express.Router();

todoRouter.get('/', asyncHandler(getAllTodosHandler));
todoRouter.get('/:id', uuidValidator, asyncHandler(getTodoHandler));
todoRouter.post('/', todoValidator, asyncHandler(createTodoHandler));
todoRouter.delete('/all', asyncHandler(deleteAllTodosHandler));
todoRouter.delete('/force/:id', uuidValidator, asyncHandler(forceDeleteTodoHandler));
todoRouter.delete('/:id', uuidValidator, asyncHandler(deleteTodoHandler));
todoRouter.patch('/:id', uuidValidator, asyncHandler(updateTodoHandler));

export default todoRouter;
