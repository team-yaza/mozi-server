import express from 'express';
import { kakaoHandler } from '@/controllers/auth';
import asyncHandler from '@/utils/asyncHandler';

const authRouter = express.Router();

authRouter.post('/kakao', asyncHandler(kakaoHandler));

export default authRouter;
