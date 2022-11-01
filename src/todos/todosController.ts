import express from 'express';
import { Route, Controller, Get, Request, SuccessResponse, Path, Security } from 'tsoa';
import { TodosService } from './todosService';

@Route('todos')
export class TodosController extends Controller {
  /**
   * 사용자의 모든 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Security('userAuth')
  @Get()
  public async getTodos(@Request() req: express.Request) {
    return await new TodosService().getAll(req.user);
  }

  /**
   * 사용자의 Todo를 가져옵니다.
   * @param id 가져올 Todo의 UUID
   */
  @SuccessResponse('200', 'Ok')
  @Security('userAuth')
  @Get('{id}')
  public async getTodo(@Path() id: string, @Request() req: express.Request) {
    return await new TodosService().get(req.user, id);
  }
}
