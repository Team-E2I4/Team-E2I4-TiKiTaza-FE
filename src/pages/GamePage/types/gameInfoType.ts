export interface I_GameRoomUserCard {
  userName: string;
  rank: number;
  userImage: string;
  userImageFallbackDelay: number;
}

export interface I_GameInfo {
  gameRoomId: string;
  gameRoomName: string;
  gameMode: string;
  gameRoomMaximumHeadCount: number;
  gameRoomUserList: Array<I_GameRoomUserCard>;
  gameRoundTotal?: number;
}
