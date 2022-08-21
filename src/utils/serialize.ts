import { getAddress } from '@/utils/reverseGeocoding';

export const serializeGeoJson = async (longitude: number, latitude: number) => {
  return {
    type: 'Point',
    name: await getAddress(longitude, latitude),
    coordinates: [longitude, latitude],
  };
};
