import { DefaultApiFactory } from '@/generated';
export const {
  createGameRoom,
  deleteMemberAccount,
  enterGameRoom,
  getMyProfileInfo,
  guestLogin,
  login,
  logout,
  reIssueAccessToken,
  signUp,
  updateMemberNickname,
} = DefaultApiFactory();
