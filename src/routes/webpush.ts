import express from 'express';

import { notificationHandler, setNotificationHandler } from '@/controllers/webpush';

import asyncHandler from '@/utils/asyncHandler';

const webpushRouter = express.Router();

webpushRouter.post('/:id', asyncHandler(notificationHandler));
webpushRouter.patch('/:id', asyncHandler(setNotificationHandler));

export default webpushRouter;
