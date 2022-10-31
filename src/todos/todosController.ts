import express from 'express';
import { Route, Controller, Get, Request, SuccessResponse } from 'tsoa';
import { TodosService } from './todosService';

@Route('todos')
export class TodosController extends Controller {
  /**
   * 사용자의 모든 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async getTodos(@Request() req: express.Request) {
    return await new TodosService().getAll(req.user.id);
  }
}
