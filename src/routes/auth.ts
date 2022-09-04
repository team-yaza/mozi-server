import express, { Request, Response } from 'express';
import { registerHandler, loginHandler, logoutHandler } from '@/controllers/auth';
import { isLoggedIn, isNotLoggedIn } from '@/middlewares/login';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/register', isNotLoggedIn, registerHandler);

authRouter.post('/login', isNotLoggedIn, loginHandler);

authRouter.get('/logout', isLoggedIn, logoutHandler);

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
