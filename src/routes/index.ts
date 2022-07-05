import express from 'express';
import todoRouter from './todo';

const baseRouter = express.Router();

baseRouter.use('/todo', todoRouter);

export default baseRouter;
