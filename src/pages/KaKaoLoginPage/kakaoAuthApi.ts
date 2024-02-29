import { axiosInstance } from '@/apis/api';
import { BASE_PATH } from '@/generated/base';

export const kakaoAuthApi = async (code: string) => {
  const response = await axiosInstance.post(
    `${BASE_PATH}/api/v1/auth/login/kakao?code=${code}`
  );
  return response;
};
