import User from '@/models/user';
import { UserCreationParams } from '@/users/user';
import config from '@/config';
import axios from 'axios';
import jwt from 'jsonwebtoken';

abstract class Auth {
  abstract url: string;

  public async login(accessToken: string): Promise<string> {
    const data = await this.request(accessToken);
    const userCreationParams = this.parseUserCreationParams(data);

    let user = await User.findByPk(userCreationParams.id);
    if (!user) {
      user = await this.register(userCreationParams);
    }
    await user.update(userCreationParams);

    return this.getToken(userCreationParams);
  }

  public async register(userCreationParams: UserCreationParams) {
    return await User.create(userCreationParams);
  }

  public getToken(userCreationParams: UserCreationParams) {
    const { id, name, email, profileImage } = userCreationParams;

    return jwt.sign(
      {
        id,
        name,
        email,
        profileImage,
      },
      config.jwtSecret,
      { issuer: 'hyunjin' },
    );
  }

  abstract request(accessToken: string): Promise<any>;
  abstract parseUserCreationParams(data: any): UserCreationParams;
}

export class kakaoAuth extends Auth {
  url = 'https://kapi.kakao.com/v2/user/me';

  public async request(accessToken: string) {
    const response = await axios.get(this.url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return response.data;
  }

  public parseUserCreationParams(data: any): UserCreationParams {
    const {
      id,
      email,
      kakao_account: {
        profile: { nickname: name, thumbnail_image_url: thumbnailImage, profile_image_url: profileImage },
      },
    } = data;

    return {
      id,
      name,
      email,
      thumbnailImage,
      profileImage,
    };
  }
}

export class MockAuth extends Auth {
  url = '';

  public request(): Promise<any> {
    return Promise.resolve({
      id: 1,
      name: 'test',
      email: 'test@email.com',
    });
  }

  public parseUserCreationParams(data: any): UserCreationParams {
    return data;
  }

  public getToken(userCreationParams: UserCreationParams): string {
    return jwt.sign(
      {
        ...userCreationParams,
        date: new Date().toString(),
      },
      config.jwtSecret,
      { issuer: 'hyunjin', expiresIn: 300 },
    );
  }
}
