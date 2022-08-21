import axios from 'axios';

const naverApiUrl = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc';

const naverApiRequest = async (longitude: number, latitude: number) => {
  const {
    data: { status, results },
  } = await axios.get(naverApiUrl, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': `${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`,
      'X-NCP-APIGW-API-KEY': `${process.env.PUBLIC_NAVER_SECRET_KEY}`,
    },
    params: {
      coords: `${longitude},${latitude}`,
      output: 'json',
    },
  });
  return results;
};

const parseAddress = (naverApiResults: any) => {
  const [legalcode, admcode] = naverApiResults;
  const area = [];
  for (let i = 1; i <= 4; i++) {
    area.push(legalcode['region'][`area${i}`]['name']);
  }
  return area.join(' ');
};

export const getAddress = async (longitude: number, latitude: number) => {
  const results = await naverApiRequest(longitude, latitude);
  const address = parseAddress(results);
  return address;
};
