import express from 'express';

import { getAllAreasHandler, createAreaHandler, createProjectInAreaHandler } from '@/controllers/area';
import asyncHandler from '@/utils/asyncHandler';

const areaRouter = express.Router();

areaRouter.get('/all', asyncHandler(getAllAreasHandler));
areaRouter.post('/create', asyncHandler(createAreaHandler));
areaRouter.post('/create-project', asyncHandler(createProjectInAreaHandler));

export default areaRouter;
