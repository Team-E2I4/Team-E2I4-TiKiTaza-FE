import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getMemberRanking } from '@/apis/api';
import { ApiResponseListMemberRankResponse } from '@/generated';

export const useRank = (gameType?: string) => {
  return useSuspenseQuery<
    AxiosResponse<ApiResponseListMemberRankResponse>,
    Error | AxiosError
  >({
    queryKey: ['rank', gameType],
    queryFn: () => getMemberRanking(gameType),
  });
};
