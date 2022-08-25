import User from '@/models/user';
import { Strategy } from 'passport-kakao';

const kakaoStrategy = new Strategy(
  {
    clientID: process.env.KAKAO_ID!,
    callbackURL: '/api/v1/auth/kakao/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const {
        _json: {
          kakao_account: { email: username },
        },
      } = profile;
      const exUser = await User.findOne({
        username,
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          username,
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
