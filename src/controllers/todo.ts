import { Request, Response } from 'express';

import { findAllTodos, createTodo, deleteTodo, updateTodo, findTodo } from '@/services/todo';

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

  if (result) res.status(200).json(result);
  else throw 'Todo was not found';
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const affectedCount = await updateTodo(req.params.id, req.body);

  const todo = await findTodo(req.params.id);

  if (affectedCount) res.status(201).json(todo);
  else throw 'Todo was not updated';
};
