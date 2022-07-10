import express from 'express';

import { getAllHeadersHandler, createHeaderHandler } from '@/controllers/header';

const headerRouter = express.Router();

headerRouter.get('/all', getAllHeadersHandler);
headerRouter.post('/create', createHeaderHandler);

export default headerRouter;
