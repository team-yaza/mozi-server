import express, { Application } from 'express';
import loader from '../../src/loaders/index';

import request from 'supertest';
import { Query, validator } from './location';

let app: Application;

beforeAll(async () => {
  app = express();
  await loader(app);
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

describe('InstantSearch', () => {
  test('Random search', async () => {
    const { longitude, latitude, keyword } = new Query();
    const { body: locations } = await search(longitude, latitude, keyword);

    for (const location of locations) {
      expect(validator(location)).toBeTruthy();
    }
  });
});
