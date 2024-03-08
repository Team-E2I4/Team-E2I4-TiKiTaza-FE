import first from '@/assets/rank/first_rank.png';
import second from '@/assets/rank/second_rank.png';
import third from '@/assets/rank/third_rank.png';
import { MemberRankResponse } from '@/generated';

interface RankItemProps {
  rank: MemberRankResponse;
  index: number;
}

const RankItem = ({ rank, index }: RankItemProps) => {
  const mappedRank: Record<number, string> = {
    0: first,
    1: second,
    2: third,
  };
  return (
    <div className='flex gap-2 justify-center items-center font-bold text-4xl py-6 px-4 border-b border-gray-100'>
      <span className='w-[20%] flex justify-center items-center'>
        {index < 3 ? (
          <img
            src={mappedRank[index]}
            alt={mappedRank[index]}
            className='h-10'
          />
        ) : (
          index + 1
        )}
      </span>
      <span className='w-[20%] text-center'>{rank.nickname}</span>
      <span className='w-[20%] text-center'>{rank.averageWpm}</span>
      <span className='w-[20%] text-center'>{rank.averageAccuracy}</span>
      <span className='w-[20%] text-center'>{rank.totalScore}</span>
    </div>
  );
};

export default RankItem;
