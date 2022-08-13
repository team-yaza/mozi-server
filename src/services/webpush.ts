import { findTodo } from '@/services/todo';
import webpush from 'web-push';

export const notifyTodo = async (subscription: webpush.PushSubscription, id: any) => {
  const todo = await findTodo(id);
  return await webpush.sendNotification(subscription, JSON.stringify(todo));
};
