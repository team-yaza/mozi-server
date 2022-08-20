import { Request, Response } from 'express';
import { notifyTodo } from '@/services/webpush';
import { updateTodoAlarmed } from '@/services/todo';

export const notificationHandler = async (req: Request, res: Response) => {
  const subscription = JSON.parse(req.body.subscription);
  const webpushResponse = await notifyTodo(subscription, req.params.id);
  await updateTodoAlarmed(req.params.id, true);
  res.writeHead(webpushResponse.statusCode, webpushResponse.headers);
  res.end(webpushResponse.body);
};

export const setNotificationHandler = async (req: Request, res: Response) => {
  const result = await updateTodoAlarmed(req.params.id, false);
  res.status(200).json(result);
};
