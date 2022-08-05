export const serializeGeoJson = (longitude: number, latitude: number) => ({
  type: 'Point',
  coordinates: [longitude, latitude],
});
