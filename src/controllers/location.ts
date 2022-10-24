import { Request, Response, NextFunction } from 'express';

import { instantSearch, getNearby, getTodosWithLocation } from '@/services/location';

export const instantSearchHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { longitude, latitude, keyword } = req.body;

  try {
    const locations = await instantSearch(longitude, latitude, keyword);

    return res.status(200).json(locations);
  } catch (error: unknown) {
    return next();
  }
};

export const getNearbyHandler = async (req: Request, res: Response) => {
  const { longitude, latitude, keyword } = req.body;
  const locations = await getNearby(longitude, latitude, keyword);

  res.status(200).json(locations);
};

export const getTodosWithLocationsHandler = async (req: Request, res: Response) => {
  const todosWithLocation = await getTodosWithLocation();

  return res.status(200).json(todosWithLocation);
};
