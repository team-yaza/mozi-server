import { Request, Response, NextFunction } from 'express';

const asyncHandler =
  (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
