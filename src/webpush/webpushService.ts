import { Todo } from '@/todos/todo';
import webpush, { PushSubscription } from 'web-push';

export class webpushService {
  public async pushTodo(id: string, subscription: PushSubscription) {
    const todo = await Todo.findByPk(id);

    if (!todo) return;

    await todo.update('alarmed', true);

    return await webpush.sendNotification(subscription, JSON.stringify(todo));
  }
}
