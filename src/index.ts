import { app } from './app';

import logger from '@/utils/logger';

const run = async () => {
  const server = await app();

  server.listen(3001, () => logger.info('server started'));
};

run();

process.on('unhandledRejection', (error) => console.log(error));
process.on('uncaughtException', (error) => console.log(error));
