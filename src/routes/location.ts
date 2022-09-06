import express from 'express';

import { getNearbyHandler } from '@/controllers/location';

const locationRouter = express.Router();

locationRouter.post('/nearby', getNearbyHandler);

export default locationRouter;
