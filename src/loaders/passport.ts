import express from 'express';
import passport from 'passport';
import User from '@/models/user';

import kakaoStrategy from '@/utils/kakaoStrategy';

const passportLoader = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy() as any);

  passport.serializeUser(User.serializeUser() as any);

  passport.deserializeUser(User.deserializeUser());

  passport.use(kakaoStrategy);
};

export default passportLoader;
