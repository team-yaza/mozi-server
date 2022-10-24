import express from 'express';

import { instantSearchHandler, getNearbyHandler, getTodosWithLocationsHandler } from '@/controllers/location';

const locationRouter = express.Router();

locationRouter.get('/', getTodosWithLocationsHandler);
locationRouter.post('/nearby', instantSearchHandler, getNearbyHandler);

export default locationRouter;
