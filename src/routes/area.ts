import express from 'express';

import { getAllAreasHandler, createAreaHandler, createProjectInAreaHandler } from '@/controllers/area';

const areaRouter = express.Router();

areaRouter.get('/all', getAllAreasHandler);
areaRouter.post('/create', createAreaHandler);
areaRouter.post('/create-project', createProjectInAreaHandler);

export default areaRouter;
