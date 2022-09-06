import mysql from 'mysql2/promise';

const sequelizeLoader = async () => {
  const connection = await mysql.createConnection('mysql://root:root@localhost:3306');
  await connection.query('CREATE DATABASE IF NOT EXISTS mozi;');
};

export default sequelizeLoader;
