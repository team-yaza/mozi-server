import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

import { define as user } from '@/users/user';
import { define as userTodo } from '@/users/usertodo';
import { define as todo } from '@/todos/todo';

import { sequelize as config } from '@/utils/config';

const sequelizeLoader = async () => {
  const { host, user, password, database, port } = config[process.env.NODE_ENV];

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

  define(sequelize);
  await sequelize.sync();
};

const define = (sequelize: Sequelize) => {
  todo(sequelize);
  user(sequelize);
  userTodo();
};

export default sequelizeLoader;
