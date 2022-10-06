import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

export const uuidHandler = (req: Request, res: Response, next: NextFunction) => {
  const uuidSchema = z.string().uuid('Invalid uuid');

  try {
    uuidSchema.parse(req.params.id);
  } catch (error) {
    return res.status(400).json(error);
  }

  return next();
};
