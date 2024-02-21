import { DefaultApiFp } from '@/generated';
import { SSEApiFp } from '@/generated';
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
} = DefaultApiFp();
export const { connect } = SSEApiFp();
