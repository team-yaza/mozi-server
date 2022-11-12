export interface Config {
  development: object;
  production: object;
  test: object;
}

export const sequelize: Config = {
  development: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: 'localhost',
    port: process.env.DATABASE_PORT,
  },
  production: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
  },
  test: {
    user: 'root',
    password: 'root',
    database: 'test',
    host: 'localhost',
    port: process.env.DATABASE_PORT,
  },
};
