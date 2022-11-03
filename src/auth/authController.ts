import { Body, Controller, Get, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { kakaoAuth, MockAuth } from './authService';

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  /**
   * Kakao를 통해 로그인 혹은 회원가입합니다.
   * @summary Kakao를 통해 로그인 혹은 회원가입합니다.
   */
  @SuccessResponse('200', 'Ok')
  @Post('kakao')
  public async kakao(@Body() reqBody: { accessToken: string }) {
    return await new kakaoAuth().login(reqBody.accessToken);
  }

  /**
   * API 문서용 유저로 로그인합니다.
   * 우측 상단의 Authorize 탭에서 토큰을 그대로 입력하세요. 5분 후 만료됩니다.
   * @summary API 문서용 유저로 로그인합니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get('mock')
  public async mock() {
    return await new MockAuth().login();
  }
}
