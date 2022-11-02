import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { kakaoAuth } from './authService';

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
    return new kakaoAuth().login(reqBody.accessToken);
  }
}
