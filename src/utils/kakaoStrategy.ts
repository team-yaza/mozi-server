import dotenv from 'dotenv';

import { Strategy } from 'passport-kakao';

import User from '@/models/user';

dotenv.config();

const kakaoStrategy = new Strategy(
  {
    clientID: process.env.KAKAO_ID!,
    callbackURL: '/api/v1/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser: any = await User.findOne({
        where: {
          email: profile._json.kakao_account.email,
        },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json.kakao_account.email,
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  },
);

export default kakaoStrategy;
