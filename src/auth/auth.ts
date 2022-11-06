import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import config from '@/config';
import { User } from '@/users/user';

export async function expressAuthentication(request: express.Request, securityName: string, _?: string[]) {
  if (securityName === 'bearerAuth') {
    if (!request.headers.authorization) {
      throw new createHttpError.Unauthorized('No authorization header provided');
    }

    if (!request.headers.authorization.startsWith('Bearer')) {
      throw new createHttpError.Unauthorized("Authorization header's type is not Bearer");
    }

    const [, credential] = request.headers.authorization.split(' ');

    if (!config.jwtSecret) {
      throw new createHttpError.Unauthorized('No secret key provided');
    }

    const decoded = jwt.verify(credential, config.jwtSecret) as JwtPayload;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new createHttpError.Unauthorized('Token verification failed or User not found');
    }

    return user;
  }
}
