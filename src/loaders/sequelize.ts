import mysql from 'mysql2/promise';
import modelInit from '@/models';
import { Sequelize } from 'sequelize';

const sequelizeLoader = async () => {
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : process.env.DATABASE_URL;

  const connection = await mysql.createConnection({
    host,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS mozi;');

  const sequelize = new Sequelize(
    `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${host}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    {
      logging: false,
    },
  );

  await modelInit(sequelize);
};

export default sequelizeLoader;
