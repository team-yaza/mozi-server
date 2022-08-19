import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { register } from '@/services/auth';

export const registerHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await register(username, password);

  res.status(201).json(user);
};

export const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (!user) {
      return res.send('user authentication failed');
    }
    // user를 serializeUser함수로 전달
    req.login(user, (error) => {
      if (error) {
        console.error(error);
        next(error);
      } else {
        console.log(`${(req.user as any).username} login success`);
        res.redirect('/');
      }
    });
  })(req, res, next);
};

export const logoutHandler = (req: Request, res: Response) => {
  console.log(`${(req.user as any).username} logout`);
  req.logout({}, (err) => {
    if (err) {
      console.error(err);
    }
  });
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
  });
  res.redirect('/');
};
