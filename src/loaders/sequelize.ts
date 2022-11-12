import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import { SequelizeConfig as Config } from '@/utils/config';

import { define as user } from '@/users/user';
import { define as userTodo } from '@/users/usertodo';
import { define as todo } from '@/todos/todo';

const sequelizeLoader = async () => {
  const { host, user, password, database, port } = new Config();

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
    port,
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
