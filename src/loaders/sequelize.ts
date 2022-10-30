import mysql from 'mysql2/promise';
import modelInit from '@/models';
import { Sequelize } from 'sequelize';
import config from '@/config/sequelize';

const sequelizeLoader = async () => {
  const { host, user, password, database, port } =
    config[process.env.NODE_ENV as 'development' | 'production' | 'test'];

  const connection = await mysql.createConnection({
    host,
    user,
    password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
  await connection.end();

  const sequelize = new Sequelize({
    dialect: 'mysql',
    host,
    username: user,
    password,
    database,
    port: parseInt(port ?? '3306'),
    logging: false,
  });

  await modelInit(sequelize);
};

export default sequelizeLoader;
