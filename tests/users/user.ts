import { faker as fakerko } from '@faker-js/faker/locale/ko';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import config from '../../src/config';

export class MockUserCreateParams {
  declare email: string;
  declare name: string;
  declare profileImage: string;
  declare thumbnailImage: string;

  constructor() {
    this.email = faker.internet.email();
    this.name = fakerko.name.lastName().concat(fakerko.name.firstName());
    this.profileImage = faker.internet.avatar();
    this.thumbnailImage = faker.internet.avatar();
  }
}

export const getToken = (id: string, name: string, email: string, profileImage: string) => {
  return jwt.sign({ id, name, email, profileImage }, config.jwtSecret, { issuer: 'hyunjin' });
};
