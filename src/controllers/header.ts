import { Request, Response } from 'express';

import { findAllHeaders, createHeader } from '@/services/header';

export const getAllHeadersHandler = async (req: Request, res: Response) => {
  try {
    const todos = await findAllHeaders();

    return res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: 'Todos not found' });
  }
};

export const createHeaderHandler = async (req: Request, res: Response) => {
  try {
    const todo = await createHeader(req.body);

    return res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not created' });
  }
};
