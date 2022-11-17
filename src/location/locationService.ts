import axios from 'axios';
import { location } from './location';

export class LocationService {
  async search(longitude: number, latitude: number, keyword: string) {
    try {
      return await new NaverInstantSearch().search(longitude, latitude, keyword);
    } catch (error: unknown) {
      return await new GoogleNearBySearch().search(longitude, latitude, keyword);
    }
  }

  async recommend(longitude: number, latitude: number) {
    return await new NaverRecommended().search(longitude, latitude, '가볼만한 곳');
  }
}

abstract class LocationSearch {
  protected abstract url: string;
  protected abstract apiKey?: string;

  protected abstract request(longitude: number, latitude: number, keyword: string): Promise<any>;
  protected abstract parse(data: any): location[];

  async search(longitude: number, latitude: number, keyword: string): Promise<location[]> {
    const data = await this.request(longitude, latitude, keyword);
    return this.parse(data);
  }
}

class NaverInstantSearch extends LocationSearch {
  protected url = 'https://map.naver.com/v5/api/instantSearch';
  protected apiKey = undefined;

  protected async request(longitude: number, latitude: number, query: string): Promise<any> {
    const { data, status } = await axios.get(this.url, {
      params: {
        coords: `${latitude},${longitude}`,
        query,
      },
      timeout: 200,
    });

    if (status != 200) throw 'instant search failed';

    return data;
  }

  protected parse(data: any): location[] {
    const { place } = data;

    const locations: location[] = place.map((data: any) => {
      const { title: name, x: longitude, y: latitude } = data;

      const location: location = {
        name,
        location: [parseFloat(longitude), parseFloat(latitude)],
      };

      return location;
    });

    return locations;
  }
}

class GoogleNearBySearch extends LocationSearch {
  url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  apiKey = process.env.GOOGLE_NEARBYSEARCH_API_KEY;

  protected async request(longitude: number, latitude: number, keyword: string): Promise<any> {
    const { data } = await axios.get(this.url, {
      params: {
        location: `${latitude},${longitude}`,
        keyword,
        rankby: 'distance',
        language: 'ko',
        key: this.apiKey,
      },
    });

    return data;
  }

  protected parse(data: any): location[] {
    const { results } = data;

    const locations: location[] = results.map((data: any) => {
      const {
        name,
        geometry: {
          location: { lng: longitude, lat: latitude },
        },
      } = data;

      const location: location = {
        name,
        location: [longitude, latitude],
      };

      return location;
    });

    return locations;
  }
}

class NaverRecommended extends LocationSearch {
  protected url = 'https://map.naver.com/v5/api/search';
  protected apiKey: string | undefined;

  protected async request(longitude: number, latitude: number, keyword: string): Promise<any> {
    const { data } = await axios.get(this.url, {
      params: {
        query: keyword,
        searchCoord: `${longitude};${latitude}`,
        isPlaceRecommendationReplace: true,
      },
    });

    return data;
  }

  protected parse(data: any): location[] {
    const {
      result: {
        place: { list },
      },
    } = data;

    const locations: location[] = list.map((data: any) => {
      const location: location = {
        name: data.name,
        location: [parseFloat(data.x), parseFloat(data.y)],
      };

      return location;
    });

    return locations;
  }
}
