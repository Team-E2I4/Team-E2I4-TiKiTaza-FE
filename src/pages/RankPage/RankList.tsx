import { useMemo } from 'react';
import { RankingResponse } from '@/generated';
import RankItem from './RankItem';

export interface RankListProps {
  rankData: RankingResponse[] | undefined;
}

const RankList = ({ rankData }: RankListProps) => {
  const sortedRankData = useMemo(() => {
    if (!rankData) {
      return [];
    }
    return [...rankData].sort((a, b) => a.ranking - b.ranking);
  }, [rankData]);

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden'>
      <div className='flex gap-2 justify-center font-bold font-[Giants-Inline] text-5xl py-4 px-4 border-b border-gray-200'>
        <span className='flex-1 text-center'>순위</span>
        <span className='flex-1 text-center'>닉네임</span>
        <span className='flex-1 text-center'>점수</span>
      </div>
      {sortedRankData.map((rank, index) => (
        <RankItem
          key={rank.ranking}
          rank={rank}
          index={index}
        />
      ))}
    </div>
  );
};

export default RankList;
