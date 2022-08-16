import axios from 'axios';
import xml2js from 'xml2js';

export const serializeGeoJson = async (longitude: number, latitude: number) => {
  const xml = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': `${process.env.NAVER_CLIENT_ID}`,
        'X-NCP-APIGW-API-KEY': `${process.env.NAVER_SECRET_KEY}`,
      },
    },
  );

  //xml to object
  const parseXml = async (xmlString: string) =>
    await new Promise((resolve, reject) =>
      xml2js.parseString(xmlString, (err, jsonData) => {
        if (err) {
          reject(err);
        }
        resolve(jsonData);
      }),
    );

  const name: any = await parseXml(xml.data);

  return {
    type: 'Point',
    name: '충남대학교',
    coordinates: [longitude, latitude],
  };
};
