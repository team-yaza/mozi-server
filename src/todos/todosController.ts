import express from 'express';
import {
  Route,
  Controller,
  Get,
  Request,
  SuccessResponse,
  Path,
  Security,
  Body,
  Post,
  Delete,
  Patch,
  Tags,
  Query,
  Put,
} from 'tsoa';
import { TodoCreationParams, TodoSyncParams } from './todo';
import { TodosService } from './todosService';

@Route('todos')
@Security('bearerAuth')
@Tags('Todo')
export class TodosController extends Controller {
  /**
   * 사용자의 모든 Todo를 가져옵니다.
   * @summary 사용자의 모든 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async getTodos(@Request() req: express.Request) {
    return await new TodosService().get(req.user);
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
   * 사용자의 모든 Todo를 삭제합니다.
   * @param force 복구가 불가능하게 삭제합니다.
   * @summary 사용자의 모든 Todo를 삭제합니다.
   */
  @SuccessResponse('204', 'No contents')
  @Delete()
  public async removeTodos(@Request() req: express.Request, @Query() force = false) {
    await new TodosService().remove(req.user, undefined, force);
  }

  /**
   * 사용자의 Todo를 가져옵니다.
   * @param id 가져올 Todo의 UUID
   * @summary 사용자의 Todo를 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get('{id}')
  public async getTodo(@Path() id: string, @Request() req: express.Request) {
    const [todo] = await new TodosService().get(req.user, id);
    return todo;
  }

  /**
   * 사용자의 Todo를 삭제합니다.
   * @param id 삭제할 Todo의 UUID
   * @param force 복구가 불가능하게 삭제합니다.
   * @summary 사용자의 Todo를 삭제합니다.
   */
  @SuccessResponse('204', 'No contents')
  @Delete('{id}')
  public async removeTodo(@Path() id: string, @Request() req: express.Request, @Query() force = false) {
    await new TodosService().remove(req.user, id, force);
  }

  /**
   * 사용자의 Todo를 업데이트합니다.
   * @param id 업데이트할 Todo의 UUID
   * @param restore 삭제된 Todo라면 복구합니다.
   * @summary 사용자의 Todo를 업데이트합니다.
   */
  @SuccessResponse('204', 'No contents')
  @Patch('{id}')
  public async updateTodo(
    @Path() id: string,
    @Request() req: express.Request,
    @Body() reqBody: TodoCreationParams,
    @Query() restore = false,
  ) {
    await new TodosService().update(req.user, id, reqBody, restore);
  }

  /**
   * 사용자의 Todo를 동기화합니다.
   * 만약 해당하는 Todo가 존재하지 않는다면 생성하고, 존재한다면 업데이트합니다.
   * @param id 동기화할 Todo의 UUID
   * @summary 사용자의 Todo를 동기화합니다.
   */
  @SuccessResponse('201', 'Created')
  @Put('{id}')
  public async syncTodo(@Path() id: string, @Request() req: express.Request, @Body() reqBody: TodoSyncParams) {
    return await new TodosService().sync(req.user, id, reqBody);
  }
}
