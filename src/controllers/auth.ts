import { Request, Response, NextFunction } from 'express';
import User from '@/models/user';
import passport from 'passport';

export const registerHandler = async (req: Request, res: Response) => {
  const { email, name, id, image } = req.body;

  try {
    const existedUser = await User.findOne({ where: { id } });
    if (existedUser) {
      await existedUser.update({ email, name, image });
      res.status(200).json({ message: '이미 존재하는 아이디입니다.' });
    }

    await User.create({
      id,
      email,
      name,
      image,
    });

    res.status(200).json({ message: '회원가입에 성공했습니다.' });
  } catch (error) {
    console.log(error);
  }
};

// export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   try {
//     const exUser = await User.findOne({ where: { email } });
//     if (exUser) {
//       return res.redirect('/login');
//     }

//     const hash = await bcrypt.hash(password, 12);
//     await User.create({
//       email,
//       password: hash,
//     });
//     return res.redirect('/');
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// };

export const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (authError, user) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    if (!user) {
      return res.redirect('/');
    }
    req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
      }
      res.redirect('/');
    });
  })(req, res, next);
};

export const logoutHandler = (req: Request, res: Response) => {
  req.logout({}, (logoutError) => {
    if (logoutError) {
      console.error(logoutError);
    }
  });
  req.session.destroy((logoutError) => {
    if (logoutError) {
      console.error(logoutError);
    }
  });
  res.redirect('/');
};
