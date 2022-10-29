import express, { Application } from 'express';
import loader from '../src/loaders/index';

import request from 'supertest';

import { faker } from '@faker-js/faker/locale/ko';
import z from 'zod';

let app: Application;

beforeAll(async () => {
  app = express();
  await loader(app);
});

const generator = () => {
  class Query {
    declare longitude: number;
    declare latitude: number;
    declare keyword: string;

    constructor() {
      const [latitude, longitude] = faker.address.nearbyGPSCoordinate(
        [36.36542770000048, 127.33338864606384],
        100,
        true,
      );

      this.longitude = parseFloat(longitude);
      this.latitude = parseFloat(latitude);

      const city = faker.address.cityName();
      const product = faker.commerce.product();

      this.keyword = `${city} ${product}`;
    }
  }

  return new Query();
};

const validator = (data: any) => {
  const locationSchema = z.object({
    name: z.string(),
    location: z.number().array().length(2),
  });

  const { success } = locationSchema.safeParse(data);

  return success;
};

const search = async (longitude: number, latitude: number, keyword: string) => {
  return await request(app)
    .post(`/api/v1/location/nearby`)
    .send({
      longitude,
      latitude,
      keyword,
    })
    .expect(200);
};

describe('InstantSearch', () => {
  test('Random search', async () => {
    const { longitude, latitude, keyword } = generator();
    const { body: locations } = await search(longitude, latitude, keyword);

    for (const location of locations) {
      expect(validator(location)).toBeTruthy();
    }
  });
});
