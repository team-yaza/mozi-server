import Header from '@/models/header';

export const findAllHeaders = async () => {
  const headers = await Header.find();
  return headers;
};

export const createHeader = async (data: any) => {
  const header = await Header.create(data);
  return header;
};
