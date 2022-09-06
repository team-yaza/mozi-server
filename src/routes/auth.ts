import express from 'express';
import { registerHandler } from '@/controllers/auth';

const authRouter = express.Router();

authRouter.post('/register', registerHandler);

export default authRouter;
