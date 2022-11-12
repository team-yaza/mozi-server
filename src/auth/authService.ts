import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '@/users/user';
import { UserCreationParams } from '@/users/user';
import { Todo } from '@/todos/todo';

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
      process.env.JWT_SECRET,
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

  public async login(): Promise<string> {
    const data = await this.request();
    const userCreationParams = this.parseUserCreationParams(data);

    let user = await User.findByPk(userCreationParams.id);
    if (!user) {
      user = await this.register(userCreationParams);
    }

    await Todo.destroy({
      where: {
        userId: user.id,
      },
      force: true,
    });

    return this.getToken(userCreationParams);
  }

  public getToken(userCreationParams: UserCreationParams): string {
    return jwt.sign(
      {
        ...userCreationParams,
        date: new Date().toString(),
      },
      process.env.JWT_SECRET,
      { issuer: 'hyunjin', expiresIn: 300 },
    );
  }
}
