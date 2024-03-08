import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMemberRanking } from '@/apis/api';
import { ApiResponseListMemberRankResponse } from '@/generated';

export const useRank = (gameType: string) => {
  return useQuery<
    AxiosResponse<ApiResponseListMemberRankResponse>,
    Error | AxiosError
  >({
    queryKey: ['rank', gameType],
    queryFn: () => {
      if (!gameType) {
        //gameType이 없을 경우 전체 랭킹을 가져옵니다.
        return getMemberRanking();
      }
      // gameType이 있을 경우 해당 게임(Code, Sentence, WorD)의 랭킹을 가져옵니다.
      return getMemberRanking(gameType);
    },
  });
};
