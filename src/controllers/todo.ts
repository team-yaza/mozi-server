import { Request, Response } from 'express';

import { createTodo } from '@/services/todo';

export const createTodoHandler = async (req: Request, res: Response) => {
  try {
    await createTodo(req.body);

    return res.status(200).send();
  } catch (error) {
    res.status(404).json({ message: 'Todo not created' });
  }
};
