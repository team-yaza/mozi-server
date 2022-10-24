import express, { Application } from 'express';
import z from 'zod';
import request from 'supertest';

import loader from '../src/loaders/index';

let app: Application;

beforeAll(async () => {
  app = express();
  await loader(app);
});

const locationSchema = z.object({
  name: z.string(),
  location: z.number().array().length(2),
});

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

const data = {
  // 대전
  longitude: 127.33338864606384,
  latitude: 36.36542770000048,
  keyword: '서울 스타벅스',
};

describe('InstantSearch', () => {
  test('Far away Search', async () => {
    const { longitude, latitude, keyword } = data;
    const { body: locations } = await search(longitude, latitude, keyword);

    for (const location of locations) {
      console.log(location);

      const { success } = locationSchema.safeParse(location);
      expect(success).toBe(true);
    }
  });
});
