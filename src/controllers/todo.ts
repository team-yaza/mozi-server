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
  const result = await deleteTodo(req.query['todoId']);

  if (result) res.status(200).json({ message: 'remove complete' });
  else throw 'Todo not found';
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  const { todoId, newTitle } = req.body;
  const result = await updateTodo(todoId, newTitle);

  if (result) res.status(201).json({ message: 'update complete' });
  else throw 'Todo was not updated';
};
