import express from 'express';

import { notificationHandler } from '@/controllers/webpush';

import asyncHandler from '@/utils/asyncHandler';

const webpushRouter = express.Router();

webpushRouter.post('/:id', asyncHandler(notificationHandler));

export default webpushRouter;
