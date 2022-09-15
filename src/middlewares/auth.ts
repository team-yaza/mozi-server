import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// import User from '@/models/user';
import config from '@/config';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      // req.user = await User.findByPk(decoded.id);
      decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'id로 유저를 찾는데 실패했습니다.' });
    }
  }

  res.status(401).json({ message: 'Not authorized, no token' });
};
