import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000', 'https://mozi-client.vercel.app', 'https://mozi.cz'],
  credentials: true,
};

const expressLoader = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors(options));
  app.use(cookieParser());

  app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(await import('../../build/swagger.json')));
  });
};

export default expressLoader;
