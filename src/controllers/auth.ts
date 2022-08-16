import { register } from '@/services/auth';
import { Request, Response } from 'express';

export const registerHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await register(email, password);

  res.status(201).json(user);
};
