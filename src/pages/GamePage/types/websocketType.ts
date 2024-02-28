export interface I_GameRoomResponse {
  type: MessageType;
  roomId: number;
  roomInfo?: I_RoomInfo;
  allMembers?: I_AllMember[];
  exitMemberId?: number;
}
export type MessageType =
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
}

export interface I_AllMember {
  memberId: number;
  nickname: string;
  readyStatus: boolean;
}

export type HandleReadyGameType = (roomId: number) => void;
export type HandleStartGameType = (roomId: number) => void;
export type HandleKickUserType = (kickedId: number) => void;
