import express from 'express';

import asyncHandler from '@/utils/asyncHandler';
import { getAllHeadersHandler, createHeaderHandler } from '@/controllers/header';

const headerRouter = express.Router();

headerRouter.get('/all', asyncHandler(getAllHeadersHandler));
headerRouter.post('/create', asyncHandler(createHeaderHandler));

export default headerRouter;
