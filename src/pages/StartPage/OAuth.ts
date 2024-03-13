export const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
