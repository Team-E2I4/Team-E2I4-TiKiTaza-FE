import { guestLogin } from '@/apis/api';

export const guestLoginFn = async () => {
  try {
    const response = await guestLogin();

    return response.data;
  } catch (error) {
    throw new Error('게스트 로그인 실패');
  }
};
