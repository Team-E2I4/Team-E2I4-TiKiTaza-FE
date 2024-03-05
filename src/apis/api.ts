import axios from 'axios';
import { DefaultApiFactory } from '@/generated';
import { BASE_PATH } from '@/generated/base';
import storageFactory from '@/utils/storageFactory';

const { getItem } = storageFactory(localStorage);

//임시로 MyToken이라는 값을 정해두었습니다
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getItem('MyToken', '')}`;
  return config;
});

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
