import first from '@/assets/rank/first_rank.png';
import second from '@/assets/rank/second_rank.png';
import third from '@/assets/rank/third_rank.png';
import { I_ConvertedRankData } from './types/convertedRankData';

interface RankItemProps {
  rank: I_ConvertedRankData;
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
      <span className='flex flex-1 justify-center items-center'>
        {rank.ranking < 3 ? (
          <img
            src={mappedRank[rank.ranking - 1]}
            alt={mappedRank[index]}
            className='h-10'
          />
        ) : (
          rank.ranking
        )}
      </span>
      <span className='flex-1 text-center'>
        {rank.nickname}
        <strong>{rank.isMe && `(나)`}</strong>
      </span>
      <span className='flex-1 text-center'>{Math.floor(rank.score)}</span>
    </div>
  );
};

export default RankItem;
