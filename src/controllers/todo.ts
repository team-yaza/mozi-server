import { Request, Response } from 'express';

import { findAllTodos, createTodo, deleteTodo, updateTodo } from '@/services/todo';

export const getAllTodosHandler = async (req: Request, res: Response) => {
  try {
    const todos = await findAllTodos();

    return res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: 'Todos not found' });
  }
};

export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    const todo = await createTodo(req.body);

    return res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not created' });
  }
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  try {
    const result = await deleteTodo(req.query['todoId']);

    if (result) return res.status(200).json({ message: 'remove complete' });
    else throw 'Todo not found';
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  try {
    const { todoId, newTitle } = req.body;
    const result = await updateTodo(todoId, newTitle);

    if (result) return res.status(200).json({ message: 'update complete' });
    else throw 'Todo was not updated';
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
