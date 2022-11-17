import express, { Application } from 'express';
import loader from '../../src/loaders/index';

import request from 'supertest';
import { Query, validator } from './location';

let app: Application;

beforeAll(async () => {
  app = express();
  await loader(app);
});

const search = async (url: string, longitude: number, latitude: number, keyword: string, recommended = false) => {
  return await request(app)
    .get(url)
    .query({
      longitude,
      latitude,
      keyword,
      recommended,
    })
    .expect(200);
};

describe('InstantSearch', () => {
  test('Random search', async () => {
    const { longitude, latitude, keyword } = new Query();
    const { body: locations } = await search(`/api/v1/location/`, longitude, latitude, keyword);

    for (const location of locations) {
      expect(validator(location)).toBeTruthy();
    }
  });
});

describe('Recommended location', () => {
  test('Random search', async () => {
    const { longitude, latitude, keyword } = new Query();
    const { body: locations } = await search(`/api/v1/location/`, longitude, latitude, keyword, true);

    for (const location of locations) {
      expect(validator(location)).toBeTruthy();
    }
  });
});
