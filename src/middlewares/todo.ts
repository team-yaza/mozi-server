import { Request, Response, NextFunction } from 'express';
import { invalidUUID } from '@/utils/error';
import { z } from 'zod';

export const uuidValidator = (req: Request, res: Response, next: NextFunction) => {
  const uuidSchema = z.string().uuid();

  const id = req.params.id;
  const { success } = uuidSchema.safeParse(id);

  if (!success) throw invalidUUID;

  return next();
};
