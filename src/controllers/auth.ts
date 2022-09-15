import { Request, Response } from 'express';
import User from '@/models/user';
import config from '@/config';
import { getProfile } from '@/services/kakao';
import jwt from 'jsonwebtoken';

export const kakaoHandler = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;
    console.log(accessToken);

    const result = await getProfile(accessToken);

    const { id, email } = result;

    const {
      nickname: name,
      profile_image_url: profileImage,
      thumbnail_image_url: thumbnailImage,
    } = result.kakao_account.profile;

    const existedUser: any = await User.findOne({ where: { id } });

    if (existedUser) {
      await existedUser.update({ email, name, profileImage, thumbnailImage });
      await existedUser.save();
    } else {
      await User.create({
        id,
        email,
        name,
        profileImage,
        thumbnailImage,
      });
    }

    const token = jwt.sign(
      {
        id,
        name,
        email,
        profileImage,
      },
      config.jwtSecret,
      { issuer: 'hyunjin' },
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '카카오 로그인에 실패했습니다.' });
  }
};
