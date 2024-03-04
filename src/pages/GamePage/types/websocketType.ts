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
}

export type HandlePubReadyGameType = () => void;
export type HandlePubStartGameType = () => void;
export type HandlePubKickUserType = (kickedId: number) => void;

/// 인게임 웹소켓 ----
export interface I_IngameWsResponse {
  type: MessageType;
  submittedWord?: string;
  submitMemberId?: number;
  gameScore?: GameScoreType;
  allMembers?: I_AllMember[];
  questions?: I_Question[];
}
export interface I_Question {
  id: number;
  question: string;
}
export type IngameMessageType =
  | 'FIRST_ROUND_START'
  | 'NEXT_ROUND_START'
  | 'INFO'
  | 'WORD_DENIED'
  | 'FINISH';

type GameScoreType = {
  [key: string]: number;
};

export type PayloadType =
  | { currentScore: number }
  | { word: string }
  | { currentRound: number };
