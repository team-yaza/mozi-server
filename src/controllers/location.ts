import { Request, Response } from 'express';

import { getNearby } from '@/services/location';

export const getNearbyHandler = async (req: Request, res: Response) => {
  const { longitude, latitude, keyword } = req.body;
  console.log(longitude, latitude, keyword);
  const locations = await getNearby(longitude, latitude, keyword);

  res.status(200).json(locations);
};
