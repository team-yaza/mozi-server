import mysql from 'mysql2/promise';
import modelInit from '@/models';
import { Sequelize } from 'sequelize';

const sequelizeLoader = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : 'db';

  const connection = await mysql.createConnection({
    host,
    user: 'root',
    password: 'root',
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS mozi;');

  const sequelize = new Sequelize(`mysql://root:root@${host}:3306/mozi`, {
    logging: false,
  });

  await modelInit(sequelize);
};

export default sequelizeLoader;
