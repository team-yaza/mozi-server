import { registerHandler } from '@/controllers/auth';
import asyncHandler from '@/utils/asyncHandler';
import express, { Request, Response } from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/register', asyncHandler(registerHandler));

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req: Request, res: Response) => {
    res.redirect('/');
  },
);

export default authRouter;
