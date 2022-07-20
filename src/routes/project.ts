import express from 'express';

import asyncHandler from '@/utils/asyncHandler';
import { getAllProjectsHandler, createProjectHandler, createProjectHeaderHandler } from '@/controllers/project';

const projectRouter = express.Router();

projectRouter.get('/all', asyncHandler(getAllProjectsHandler));
projectRouter.post('/create', asyncHandler(createProjectHandler));
projectRouter.post('/create-header', asyncHandler(createProjectHeaderHandler));

export default projectRouter;
