import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { getRanking } from '@/apis/api';
import { ApiResponseListRankingResponse } from '@/generated';

export const useRank = (gameType?: string) => {
  return useSuspenseQuery<
    AxiosResponse<ApiResponseListRankingResponse>,
    Error | AxiosError
  >({
    queryKey: ['rank', gameType],
    queryFn: () => getRanking(gameType),
  });
};
