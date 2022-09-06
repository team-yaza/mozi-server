import express from 'express';
import { kakaoHandler } from '@/controllers/auth';

const authRouter = express.Router();

authRouter.post('/kakao', kakaoHandler);

export default authRouter;
