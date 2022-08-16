import express from 'express';

import { getAllAlarmHandler } from '@/controllers/alarm';

import asyncHandler from '@/utils/asyncHandler';

const alarmRouter = express.Router();

alarmRouter.get('/:id', asyncHandler(getAllAlarmHandler));

export default alarmRouter;
