import express from 'express';
import { Route, Controller, Get, Request, SuccessResponse, Path, Security, Body, Post, Delete, Patch } from 'tsoa';
import { TodoCreationParams } from './todo';
import { TodosService } from './todosService';

@Route('todos')
@Security('bearerAuth')
export class TodosController extends Controller {
  /**
   * 사용자의 모든 Todo를 가져옵니다.
   * @summary 사용자의 모든 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async getTodos(@Request() req: express.Request) {
    return await new TodosService().getAll(req.user);
  }

  /**
   * Todo를 DB에 생성하고 가져옵니다.
   * @summary Todo를 DB에 생성하고 가져옵니다.
   */
  @SuccessResponse('201', 'Created')
  @Post()
  public async createTodo(@Request() req: express.Request, @Body() reqBody: TodoCreationParams) {
    return await new TodosService().create(req.user, reqBody);
  }

  /**
   * 사용자의 Todo를 가져옵니다.
   * @param id 가져올 Todo의 UUID
   * @summary 사용자의 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get('{id}')
  public async getTodo(@Path() id: string, @Request() req: express.Request) {
    return await new TodosService().get(req.user, id);
  }

  /**
   * 사용자의 Todo를 삭제합니다.
   * @param id 삭제할 Todo의 UUID
   * @summary 사용자의 Todo를 삭제합니다.
   */
  @SuccessResponse('200', 'Ok')
  @Delete('{id}')
  public async removeTodo(@Path() id: string, @Request() req: express.Request) {
    return await new TodosService().remove(req.user, id);
  }

  /**
   * 사용자의 Todo를 업데이트합니다.
   * @param id 업데이트할 Todo의 UUID
   * @summary 사용자의 Todo를 업데이트합니다.
   */
  @SuccessResponse('204', 'No contents')
  @Patch('{id}')
  public async updateTodo(@Path() id: string, @Request() req: express.Request, @Body() reqBody: TodoCreationParams) {
    await new TodosService().update(req.user, id, reqBody);
  }

  /**
   * 사용자의 Todo를 복원합니다.
   * @param id 복원할 Todo의 UUID
   * @summary 사용자의 Todo를 복원합니다.
   */
  @SuccessResponse('204', 'No contents')
  @Patch('{id}/restore')
  public async restoreTodo(@Path() id: string, @Request() req: express.Request) {
    await new TodosService().restore(req.user, id);
  }
}
