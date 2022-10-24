import { Request, Response, NextFunction } from 'express';
import z from 'zod';

export const locationValidator = (req: Request, res: Response, next: NextFunction) => {
  const locationSchema = z.object({
    locationName: z.string().optional(),
    longitude: z.number().gte(-180).lte(180).optional(),
    latitude: z.number().gte(-90).lte(90).optional(),
  });

  locationSchema.parse(req.body);

  return next();
};
