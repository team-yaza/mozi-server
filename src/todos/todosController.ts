import express from 'express';
import { Route, Controller, Get, Request, SuccessResponse, Path, Security, Body, Post } from 'tsoa';
import { TodoCreationParams } from './todo';
import { TodosService } from './todosService';

@Route('todos')
export class TodosController extends Controller {
  /**
   * 사용자의 모든 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Security('bearerAuth')
  @Get()
  public async getTodos(@Request() req: express.Request) {
    return await new TodosService().getAll(req.user);
  }

  /**
   * Todo를 DB에 생성하고 가져옵니다.
   */
  @SuccessResponse('201', 'Created')
  @Security('bearerAuth')
  @Post()
  public async createTodo(@Request() req: express.Request, @Body() reqBody: TodoCreationParams) {
    return await new TodosService().create(req.user, reqBody);
  }

  /**
   * 사용자의 Todo를 가져옵니다.
   * @param id 가져올 Todo의 UUID
   */
  @SuccessResponse('200', 'Ok')
  @Security('bearerAuth')
  @Get('{id}')
  public async getTodo(@Path() id: string, @Request() req: express.Request) {
    return await new TodosService().get(req.user, id);
  }
}
