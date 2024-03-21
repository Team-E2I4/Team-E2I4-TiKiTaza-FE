import { useMemo } from 'react';
import RankItem from './RankItem';
import { I_ConvertedRankData } from './types/convertedRankData';

export interface RankListProps {
  convertedRankData: I_ConvertedRankData[] | undefined;
}

const RankList = ({ convertedRankData }: RankListProps) => {
  const sortedConvertedRankData = useMemo(() => {
    if (!convertedRankData) {
      return [];
    }
    return [...convertedRankData].sort((a, b) => a.ranking - b.ranking);
  }, [convertedRankData]);

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden w-[100rem]'>
      <div className='flex gap-2 justify-center font-bold font-[Giants-Inline] text-5xl py-4 px-4 border-b border-gray-200'>
        <span className='flex-1 text-center'>순위</span>
        <span className='flex-1 text-center'>닉네임</span>
        <span className='flex-1 text-center'>점수</span>
      </div>
      {sortedConvertedRankData.map((rank, index) => (
        <RankItem
          key={index}
          rank={rank}
          index={index}
        />
      ))}
    </div>
  );
};

export default RankList;
