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
  | 'MODIFIED'
  | 'KICKED';

export interface I_RoomInfo {
  id: number;
  hostId: number;
  title: string;
  gameMode: 'WORD' | 'CODE' | 'SENTENCE';
  inviteCode: string | null;
  maxRound: number;
  password: string;
  maxPlayer: number;
  currentPlayer: number;
  isPlaying: boolean;
  isPrivate: boolean;
}

export interface I_AllMember {
  memberId: number;
  nickname: string;
  readyStatus: boolean;
  ranking: number;
  score: number;
}

/// 인게임 웹소켓 ----
export interface I_IngameWsResponse {
  type: IngameMessageType;
  submittedWord?: string;
  submitMemberId?: number;
  allMembers: I_AllMember[];
  questions?: I_Question[];
}
export interface I_Question {
  question: string;
}
export type IngameMessageType =
  | 'EXIT'
  | 'FIRST_ROUND_START'
  | 'NEXT_ROUND_START'
  | 'INFO'
  | 'WORD_DENIED'
  | 'FINISH';

export type PublishGameRoomType = (destination: string) => void;

export type PayloadType =
  | { currentScore: number }
  | { word: string }
  | { currentRound: number; cpm: number; accuracy: number };

export type PublishIngameType = (
  destination: string,
  payload: PayloadType
) => void;
