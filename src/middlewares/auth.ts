import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '@/models/user';
import config from '@/config';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
      return res.status(401).json({ message: '토큰이 존재하지 않습니다.' });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const user = await User.findByPk(decoded.id);

      if (user) req.user = user;
      else return res.status(401).json({ message: '유저가 존재하지 않습니다.' });

      return next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'id로 유저를 찾는데 실패했습니다.' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};
