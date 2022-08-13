import { Request, Response } from 'express';
import { notifyTodo } from '@/services/webpush';

export const notificationHandler = async (req: Request, res: Response) => {
  const subscription = JSON.parse(req.body.subscription);
  const webpushResponse = await notifyTodo(subscription, req.params.id);
  res.writeHead(webpushResponse.statusCode, webpushResponse.headers);
  res.end(webpushResponse.body);
};
