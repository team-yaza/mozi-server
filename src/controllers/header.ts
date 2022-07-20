import { Request, Response } from 'express';

import { findAllHeaders, createHeader } from '@/services/header';

export const getAllHeadersHandler = async (req: Request, res: Response) => {
  const todos = await findAllHeaders();

  res.status(200).json(todos);
};

export const createHeaderHandler = async (req: Request, res: Response) => {
  const todo = await createHeader(req.body);

  res.status(201).json(todo);
};
