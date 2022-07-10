import Area from '@/models/area';

export const findAllAreas = async () => {
  const areas = await Area.find();
  return areas;
};

export const findAreaById = async (id: string) => {
  const area = await Area.findById(id);
  return area;
};

export const createArea = async (data: any) => {
  const area = await Area.create(data);
  return area;
};
