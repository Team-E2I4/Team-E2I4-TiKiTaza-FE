import { RankingResponse } from '@/generated';

export interface I_ConvertedRankData extends RankingResponse {
  isMe?: boolean;
}
