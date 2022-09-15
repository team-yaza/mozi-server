import mysql from 'mysql2/promise';
import modelInit from '@/models';

const sequelizeLoader = async () => {
  const connection = await mysql.createConnection('mysql://root:root@localhost:3306');
  await connection.query('CREATE DATABASE IF NOT EXISTS mozi;');
  await modelInit();
};

export default sequelizeLoader;
