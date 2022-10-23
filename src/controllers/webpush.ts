import { Request, Response } from 'express';
import { notifyTodo } from '@/services/webpush';
import { updateTodo } from '@/services/todo';

export const notificationHandler = async (req: Request, res: Response) => {
  const subscription = JSON.parse(req.body.subscription);
  const webpushResponse = await notifyTodo(subscription, req.params.id);

  await updateTodo(req.params.id, {
    alarmed: true,
  });

  res.writeHead(webpushResponse.statusCode, webpushResponse.headers);
  res.end(webpushResponse.body);
};

export const setNotificationHandler = async (req: Request, res: Response) => {
  await updateTodo(req.params.id, {
    alarmed: false,
  });
  res.status(200).send();
};
