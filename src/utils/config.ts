abstract class Config<Key> {
  protected abstract development(): Key;
  protected abstract production(): Key;
  protected abstract test(): Key;
}

interface SequelizeConfigKey {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export class SequelizeConfig extends Config<SequelizeConfigKey> {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;

  constructor() {
    super();

    const env = this[process.env.NODE_ENV]();

    this.user = env.user;
    this.password = env.password;
    this.database = env.database;
    this.host = env.host;
    this.port = env.port;
  }

  protected development(): SequelizeConfigKey {
    return {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: 'localhost',
      port: 3306,
    };
  }

  protected production(): SequelizeConfigKey {
    return {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_URL,
      port: parseInt(process.env.DATABASE_PORT),
    };
  }

  protected test(): SequelizeConfigKey {
    return {
      user: 'root',
      password: 'root',
      database: 'test',
      host: 'localhost',
      port: 3306,
    };
  }
}
