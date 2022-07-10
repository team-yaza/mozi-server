import express from 'express';

import { getAllProjectsHandler, createProjectHandler } from '@/controllers/project';

const projectRouter = express.Router();

projectRouter.get('/all', getAllProjectsHandler);
projectRouter.post('/create', createProjectHandler);

export default projectRouter;
