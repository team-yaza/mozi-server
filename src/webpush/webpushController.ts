import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { PushSubscription } from 'web-push';
import { WebpushService } from './webpushService';

@Route('webpush')
@Tags('Webpush')
export class webpushController extends Controller {
  /**
   * subscription으로 대상을 특정해서 web push를 보냅니다
   * @param id 보내줄 Todo의 UUID
   * @summary Todo의 내용을 알립니다.
   */
  @SuccessResponse('201', 'Created')
  @Post('{id}')
  public async pushTodo(id: string, @Body() reqBody: { subscription: PushSubscription }) {
    const res = await new WebpushService().pushTodo(id, reqBody.subscription);
    if (!res) {
      this.setStatus(500);
    }
  }
}
