import express from 'express';

import { getAllProjectsHandler, createProjectHandler, createProjectHeaderHandler } from '@/controllers/project';

const projectRouter = express.Router();

projectRouter.get('/all', getAllProjectsHandler);
projectRouter.post('/create', createProjectHandler);
projectRouter.post('/create-header', createProjectHeaderHandler);

export default projectRouter;
