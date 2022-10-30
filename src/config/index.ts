import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URL || '',
  kakaoBaseUrl: process.env.KAKAO_BASE_URL,
  kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
  kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default config;
