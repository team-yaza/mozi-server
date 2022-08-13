import { Request, Response } from 'express';
import { findTodo } from '@/services/todo';
import webpush from 'web-push';

export const notificationHandler = async (req: Request, res: Response) => {
  const todo = await findTodo(req.params.id);
  const payload = JSON.stringify(todo);
  const subscription = JSON.parse(req.body.subscription);

  try {
    const webpushResponse = await webpush.sendNotification(subscription, payload);
    res.writeHead(webpushResponse.statusCode, webpushResponse.headers).end(webpushResponse.body);
  } catch (err: any) {
    if ('statusCode' in err) {
      res.writeHead(err.statusCode, err.headers).end(err.body);
    } else {
      console.error('err : ', err);
      res.statusCode = 500;
      res.end();
    }
  }
};
