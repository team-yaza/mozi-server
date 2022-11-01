import { faker as fakerko } from '@faker-js/faker/locale/ko';
import { faker } from '@faker-js/faker';

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
