import { Todo } from '@/todos/todo';
import webpush, { PushSubscription } from 'web-push';

export class WebpushService {
  static publicVapidKey = 'BHCoqzR03UrjuAFGPoTDB5t6o05z5K3EYJ1cuZVj9sPF6FxNsS-b7y4ClNaS11L9EUpmT-wUyeZAivwGbkwMAjY';
  static privateVapidKey = 'QNapwA1rlszq7UdCqLo5s5aORi5jAAlCEFMEfZaw4tU';

  constructor() {
    webpush.setVapidDetails(
      'mailto:leehj0110@kakao.com',
      WebpushService.publicVapidKey,
      WebpushService.privateVapidKey,
    );
  }

  public async pushTodo(id: string, subscription: PushSubscription) {
    const todo = await Todo.findByPk(id);

    if (!todo) return;

    await todo.update('alarmed', true);

    return await webpush.sendNotification(subscription, JSON.stringify(todo));
  }
}
