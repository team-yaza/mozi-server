declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_URL: string;
      DATABASE_PORT: string;
    }
  }
}

export {};
