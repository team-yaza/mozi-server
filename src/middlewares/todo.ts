import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const uuidValidator = (req: Request, res: Response, next: NextFunction) => {
  const uuidSchema = z.string().uuid();

  uuidSchema.parse(req.params.id);

  return next();
};

export const todoValidator = (req: Request, res: Response, next: NextFunction) => {
  const todoSchema = z.object({
    id: z.string().uuid().optional(),

    userId: z.preprocess(() => req.user.id, z.string()),

    title: z.string().max(100).optional(),
    description: z.string().max(200).optional(),

    done: z.boolean().optional(),
    alarmed: z.boolean().optional(),

    dueDate: z.preprocess((arg) => {
      if (typeof arg == 'string') {
        return new Date(arg);
      }
    }, z.date().optional()),
    alarmDate: z.preprocess((arg) => {
      if (typeof arg == 'string') {
        return new Date(arg);
      }
    }, z.date().optional()),

    locationName: z.string().max(20).optional(),
    longitude: z.number().gte(-180).lte(180).optional(),
    latitude: z.number().gte(-90).lte(90).optional(),

    index: z.number().int().optional(),
  });

  todoSchema.parse(req.body);

  return next();
};
