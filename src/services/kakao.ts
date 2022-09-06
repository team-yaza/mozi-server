import axios from 'axios';

export const getProfile = async (accessToken: string) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
