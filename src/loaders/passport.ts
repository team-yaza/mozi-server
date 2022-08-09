import express from 'express';
import passport from 'passport';
import User from '@/models/user';

import kakaoStrategy from '@/utils/kakaoStrategy';

const passportLoader = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    done(null, user);
  });

  passport.use(kakaoStrategy);
};

export default passportLoader;
