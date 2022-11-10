import express from 'express';
import { Controller, Get, Query, Route, Tags, Request, Security, SuccessResponse } from 'tsoa';
import { GoogleMigration } from './googleMigration';

@Route('migrations/google')
@Security('bearerAuth')
@Tags('Migration')
export class GoogleMigrationController extends Controller {
  /**
   * Google Authorization URL을 반환합니다.
   * @summary Google Authorization URL을 반환합니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get('url')
  public url(@Request() req: express.Request) {
    return new GoogleMigration(req.user).url();
  }

  /**
   * Redirect URI로 오는 Authorization Code를 이용해서 Access Token을 얻습니다.
   * Access Token으로 Google Calendar의 일정을 MOZI의 할 일로 가져옵니다.
   * @param code Authorization code
   * @summary Google Calendar의 할 일을 가져옵니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async migrates(@Query() code: string, @Request() req: express.Request) {
    await new GoogleMigration(req.user).migrate(code);
  }
}
