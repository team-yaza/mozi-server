import { Application } from 'express';
import promBundle from 'express-prom-bundle';

const promLoader = (app: Application) => {
  const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
  });

  app.use(metricsMiddleware);
};

export default promLoader;
