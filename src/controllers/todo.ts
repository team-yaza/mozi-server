import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { findAllTodos, createTodo, deleteTodo, updateTodo, findTodo } from '@/services/todo';
import { createAlarm } from '@/services/alarm';

export const getAllTodosHandler = async (req: Request, res: Response) => {
  const todos = await findAllTodos();
  res.status(200).json(todos);
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const todos = await findTodo(req.params.id);

  res.status(200).json(todos);
};

export const createTodoHandler = async (req: Request, res: Response) => {
  const todo = await createTodo(req.body);

  res.status(201).json(todo);
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  const result = await deleteTodo(req.params.id);

  if (result) res.status(200).send();
  else throw 'Todo was not found';
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const { result, changeLocationFlag } = await updateTodo(req.params.id, req.body);

  const location: any = result?.location;
  if (!location.name && changeLocationFlag)
    await createAlarm(new mongoose.Types.ObjectId('123456789011'), req.params.id);

  if (result) res.status(201).json(result);
  else throw 'Todo was not updated';
};
