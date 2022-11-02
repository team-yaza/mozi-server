import axios from 'axios';
import { location } from './location';

export class LocationService {
  public async search(longitude: number, latitude: number, keyword: string) {
    try {
      return await new naverInstantSearch().search(longitude, latitude, keyword);
    } catch (error: unknown) {
      return await new googleNearBySearch().search(longitude, latitude, keyword);
    }
  }
}

abstract class LocationSearch {
  abstract url: string;
  abstract apiKey?: string;

  abstract request(longitude: number, latitude: number, keyword: string): Promise<any>;
  abstract search(longitude: number, latitude: number, keyword: string): Promise<location[]>;
}

class naverInstantSearch extends LocationSearch {
  url = 'https://map.naver.com/v5/api/instantSearch';
  apiKey = undefined;

  async request(longitude: number, latitude: number, query: string): Promise<any> {
    const {
      data: { place: locations },
      status,
    } = await axios.get(this.url, {
      params: {
        coords: `${latitude},${longitude}`,
        query,
      },
      timeout: 200,
    });

    if (status != 200) throw 'instant search failed';

    return locations;
  }

  async search(longitude: number, latitude: number, query: string): Promise<location[]> {
    const locations = await this.request(longitude, latitude, query);

    return locations.map((location: any) => {
      const { title: name, x: longitude, y: latitude } = location;

      return {
        name,
        location: [parseFloat(longitude), parseFloat(latitude)],
      };
    });
  }
}

class googleNearBySearch extends LocationSearch {
  url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  apiKey = process.env.GOOGLE_NEARBYSEARCH_API_KEY;

  async request(longitude: number, latitude: number, keyword: string): Promise<any> {
    const {
      data: { results },
    } = await axios.get(this.url, {
      params: {
        location: `${latitude},${longitude}`,
        keyword,
        rankby: 'distance',
        language: 'ko',
        key: this.apiKey,
      },
    });

    return results;
  }

  async search(longitude: number, latitude: number, keyword: string): Promise<location[]> {
    const results = await this.request(longitude, latitude, keyword);

    const locations: location[] = results.map((result: any) => {
      const {
        name,
        geometry: {
          location: { lng: longitude, lat: latitude },
        },
      } = result;
      return {
        name,
        location: [longitude, latitude],
      };
    });

    return locations;
  }
}
