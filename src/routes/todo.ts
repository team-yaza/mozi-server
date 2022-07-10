import { createTodoHandler } from '@/controllers/todo';
import express from 'express';

const todoRouter = express.Router();

todoRouter.use('/create', createTodoHandler);

export default todoRouter;
