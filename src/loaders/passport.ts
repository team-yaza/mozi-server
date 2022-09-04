import express from 'express';
import passport from 'passport';
import User from '@/models/user';

import localStrategy from '@/utils/localStrategy';
import kakaoStrategy from '@/utils/kakaoStrategy';

export const passportLoader = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    done(null, user);
  });

  passport.use(localStrategy);
  passport.use(kakaoStrategy);
};
