import { faker } from '@faker-js/faker/locale/ko';
import z from 'zod';

export class Query {
  declare longitude: number;
  declare latitude: number;
  declare keyword: string;

  constructor() {
    const [latitude, longitude] = faker.address.nearbyGPSCoordinate([36.36542770000048, 127.33338864606384], 100, true);
    const city = faker.address.cityName();
    const product = faker.commerce.product();

    this.longitude = parseFloat(longitude);
    this.latitude = parseFloat(latitude);
    this.keyword = `${city} ${product}`;
  }
}

export const validator = (data: any) => {
  const locationSchema = z.object({
    name: z.string(),
    location: z.number().array().length(2),
  });

  const { success } = locationSchema.safeParse(data);

  return success;
};
