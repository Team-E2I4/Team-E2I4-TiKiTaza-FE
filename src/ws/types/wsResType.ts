export interface I_GameRoomResponse {
  type:
    | 'ENTER'
    | 'EXIT'
    | 'READY'
    | 'START'
    | 'START_DENIED'
    | 'FINISH'
    | 'ROUND_START'
    | 'KICKED'
    | 'UPDATE'
    | 'WORD_DENIED';
  roomId: number;
  roomInfo: I_RoomInfo;
  allMembers: I_AllMember[];
}

export interface I_RoomInfo {
  id: number;
  hostId: number;
  title: string;
  gameMode: 'WORD' | 'CODE' | 'SENTENCE';
  inviteCode: string | null;
  maxPlayer: number;
  currentPlayer: number;
  isPlaying: boolean;
  isPrivate: boolean;
  mode: string;
}

export interface I_AllMember {
  memberId: number;
  nickname: string;
  readyStatus: boolean;
}
