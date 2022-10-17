import modelInit from '@/models';

const sequelizeLoader = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';
  await modelInit();
};

export default sequelizeLoader;
