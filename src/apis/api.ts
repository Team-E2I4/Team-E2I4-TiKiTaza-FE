import axios from 'axios';
import { DefaultApiFactory } from '@/generated';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';
import { getTokenStorage } from './tokenStorage';

async function refreshToken() {
  const response = await reIssueAccessToken();
  return response.data.data?.accessToken;
}

//임시로 MyToken이라는 값을 정해두었습니다
const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const storage = getTokenStorage();
  const { getItem } = storageFactory(storage);
  if (config.url?.endsWith('reissue')) {
    return config;
  }
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
      try {
        const accessToken = await refreshToken();
        const storage = getTokenStorage();
        const { setItem } = storageFactory(storage);
        if (accessToken) {
          originRequest.headers = {
            ...originRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          setItem('MyToken', accessToken);
          const response = await axios.request(originRequest);
          return response;
        }
      } catch (e) {
        if (e) {
          const storage = getTokenStorage();
          const { removeItem } = storageFactory(storage);
          removeItem('MyToken');
          alert('게스트 로그인은 최대 3시간동안 유지됩니다!');
        }
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
  logout1,
  reIssueAccessToken,
  signUp,
  getRanking,
  updateMemberNickname,
  updateGameRoom,
  getOnlineMembers,
} = DefaultApiFactory(undefined, BASE_PATH, axiosInstance);
