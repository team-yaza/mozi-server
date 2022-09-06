import { Request, Response } from 'express';
import User from '@/models/user';

export const registerHandler = async (req: Request, res: Response) => {
  const { email, name, id, image } = req.body;

  try {
    const existedUser = await User.findOne({ where: { id } });
    if (existedUser) {
      await existedUser.update({ email, name, image });
      return res.status(200).json({ message: '이미 존재하는 아이디입니다.' });
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
