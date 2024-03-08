import axios from 'axios';
import { DefaultApiFactory } from '@/generated';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';

const { getItem, setItem } = storageFactory(localStorage);

async function refreshToken() {
  const response = await reIssueAccessToken();
  return response.data.data?.accessToken;
}

//임시로 MyToken이라는 값을 정해두었습니다
const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getItem('MyToken', '')}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originRequest = error.config;
    const errorCode = error.response.data.errorCode;
    if (errorCode === 'sec-401/02') {
      const accessToken = await refreshToken();
      if (accessToken) {
        originRequest.headers = {
          ...originRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        setItem('MyToken', accessToken);
        const response = await axios.request(originRequest);
        return response;
      }
    }
    return Promise.reject(error);
  }
);

export const {
  createGameRoom,
  deleteMemberAccount,
  enterGameRoom,
  getMyProfileInfo,
  guestLogin,
  kakaoLogin,
  login,
  logout,
  reIssueAccessToken,
  signUp,
  updateMemberNickname,
  updateGameRoom,
} = DefaultApiFactory(undefined, BASE_PATH, axiosInstance);
