import { Request, Response, NextFunction } from 'express';

import { z } from 'zod';

export const uuidValidator = (req: Request, res: Response, next: NextFunction) => {
  const uuidSchema = z.string().uuid();

  try {
    uuidSchema.parse(req.params.id);
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid uuid',
    });
  }

  return next();
};
