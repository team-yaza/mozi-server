import { Request, Response } from 'express';

import { findAllTodos, createTodo } from '@services/todo';

export const getAllTodosHandler = async (req: Request, res: Response) => {
  try {
    const todos = await findAllTodos();

    return res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: 'Todos not found' });
  }

  res.send('get all todos');
};

export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    const todo = await createTodo(req.body);

    return res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not created' });
  }
};
