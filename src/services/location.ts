import axios from 'axios';
import dotenv from 'dotenv';

import Todo from '@/models/todo';

dotenv.config();

const googleNearBySearchApiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const request = async (longitude: number, latitude: number, keyword: string) => {
  // geoJSON 형식과는 다르게 (latitude, longitude) 순서임
  const location = `${latitude},${longitude}`;
  const rankby = 'distance';
  const language = 'ko';
  const key = process.env.GOOGLE_NEARBYSEARCH_API_KEY;

  const {
    data: { results },
  } = await axios.get(googleNearBySearchApiUrl, {
    params: {
      location,
      keyword,
      rankby,
      language,
      key,
    },
  });

  return results;
};

type location = {
  name: string;
  location: [number];
};

export const getNearby = async (longitude: number, latitude: number, keyword: string) => {
  const results = await request(longitude, latitude, keyword);
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

export const getTodosWithLocation = async () => {
  return await Todo.findAll({
    where: {
      location: { ne: null }, // ne: Not Equal
    },
  });
};
