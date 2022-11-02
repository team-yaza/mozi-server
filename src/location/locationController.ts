import { Controller, Get, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { LocationService } from './locationService';

@Route('location')
@Tags('Location')
export class LocationController extends Controller {
  /**
   * 현재 사용자의 위치와 주어진 키워드를 기반으로 장소를 검색합니다.
   * @param longitude 사용자 위치 경도
   * @param latitude 사용자 위치 위도
   * @param keyword 검색할 키워드
   * @summary 위치와 키워드를 기반으로 장소를 반환합니다.
   */
  @SuccessResponse('200', 'Ok')
  @Get()
  public async search(@Query() longitude: number, @Query() latitude: number, @Query() keyword: string) {
    return new LocationService().search(longitude, latitude, keyword);
  }
}
