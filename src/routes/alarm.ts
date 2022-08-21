import express from 'express';

import { getAllAlarmHandler } from '@/controllers/alarm';

import asyncHandler from '@/utils/asyncHandler';

const alarmRouter = express.Router();

alarmRouter.get('/', asyncHandler(getAllAlarmHandler));

export default alarmRouter;
