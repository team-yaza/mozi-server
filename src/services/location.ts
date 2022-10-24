import axios from 'axios';
import dotenv from 'dotenv';

import Todo from '@/models/todo';

dotenv.config();

type location = {
  name: string;
  location: [number];
};

const googleNearBySearchApiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const nearbyRequest = async (longitude: number, latitude: number, keyword: string) => {
  const {
    data: { results },
  } = await axios.get(googleNearBySearchApiUrl, {
    params: {
      location: `${latitude},${longitude}`,
      keyword,
      rankby: 'distance',
      language: 'ko',
      key: process.env.GOOGLE_NEARBYSEARCH_API_KEY,
    },
  });

  return results;
};

export const getNearby = async (longitude: number, latitude: number, keyword: string) => {
  const results = await nearbyRequest(longitude, latitude, keyword);

  const locations: location[] = results.map((result: any) => {
    const {
      name,
      geometry: {
        location: { lng: longitude, lat: latitude },
      },
    } = result;
    return {
      name,
      location: [longitude, latitude],
    };
  });
  return locations;
};

const naverInstantSearchUrl = 'https://map.naver.com/v5/api/instantSearch';

const instantRequest = async (longitude: number, latitude: number, query: string) => {
  const {
    data: { place: locations },
    status,
  } = await axios.get(naverInstantSearchUrl, {
    params: {
      coords: `${latitude},${longitude}`,
      query,
    },
    timeout: 200,
  });

  if (status != 200) throw 'instant search failed';

  return locations;
};

export const instantSearch = async (longitude: number, latitude: number, query: string) => {
  const locations = await instantRequest(longitude, latitude, query);

  return locations.map((location: any) => {
    const { title: name, x: longitude, y: latitude } = location;

    return {
      name,
      location: [parseFloat(longitude), parseFloat(latitude)],
    };
  });
};

export const getTodosWithLocation = async () => {
  return await Todo.findAll({
    where: {
      // location: { ne: null }, // ne: Not Equal
    },
  });
};
