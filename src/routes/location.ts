import express from 'express';

import { getNearbyHandler, getTodosWithLocationsHandler } from '@/controllers/location';

const locationRouter = express.Router();

locationRouter.get('/', getTodosWithLocationsHandler);
locationRouter.post('/nearby', getNearbyHandler);

export default locationRouter;
