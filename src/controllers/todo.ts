import { Request, Response } from 'express';

import { findAllTodos, createTodo, deleteTodo, updateTodo, findTodo, deleteAllTodos } from '@/services/todo';

export const getAllTodosHandler = async (req: Request, res: Response) => {
  const todos = await findAllTodos(req.user.id);

  res.status(200).json(todos);
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const todos = await findTodo(req.params.id);

  res.status(200).json(todos);
};

export const createTodoHandler = async (req: Request, res: Response) => {
  const todo = await createTodo({
    ownerId: req.user.id,
    ...req.body,
  });
  res.status(201).json(todo);
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  const result = await deleteTodo(req.params.id);

  if (result) res.status(200).json(result);
  else throw 'Todo was not found';
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const todo = await updateTodo(req.params.id, req.body);

  if (todo) res.status(201).json(todo);
  else throw 'Todo was not updated';
};

export const deleteAllTodosHandler = async (req: Request, res: Response) => {
  const result = await deleteAllTodos(req.user.id);

  res.status(200).json(result);
};
