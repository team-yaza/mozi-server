import express from 'express';

import { instantSearchHandler, getNearbyHandler, getTodosWithLocationsHandler } from '@/controllers/location';
import { locationValidator } from '@/middlewares/location';

const locationRouter = express.Router();

locationRouter.get('/', getTodosWithLocationsHandler);
locationRouter.post('/nearby', locationValidator, instantSearchHandler, getNearbyHandler);

export default locationRouter;
