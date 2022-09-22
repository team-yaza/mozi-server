import mysql from 'mysql2/promise';
import modelInit from '@/models';
import logger from '@/utils/logger';

const sequelizeLoader = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';
  logger.info(`${host}, ${process.env.NODE_ENV}`);
  const connection = await mysql.createConnection({
    host,
    user: 'root',
    password: 'root',
    database: 'mozi',
  });
  await connection.query('CREATE DATABASE IF NOT EXISTS mozi;');
  await modelInit();
};

export default sequelizeLoader;
