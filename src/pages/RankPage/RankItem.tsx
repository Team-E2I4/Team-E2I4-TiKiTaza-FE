import first from '@/asssets/rank/first_rank.png';
import second from '@/asssets/rank/second_rank.png';
import third from '@/asssets/rank/third_rank.png';

interface RankItemProps {
  rank: {
    nickname: string;
    score: number;
  };
  index: number;
}

const RankItem = ({ rank, index }: RankItemProps) => {
  return (
    <div className='flex gap-2 justify-center items-center font-bold text-4xl py-6 px-4 border-b border-gray-100'>
      <span className='w-[30%] flex justify-center items-center'>
        {index === 0 ? (
          <img
            src={first}
            alt='first'
            className='h-10'
          />
        ) : index === 1 ? (
          <img
            src={second}
            alt='second'
            className='h-10'
          />
        ) : index === 2 ? (
          <img
            src={third}
            alt='third'
            className='h-10'
          />
        ) : (
          index + 1
        )}
      </span>
      <span className='w-[40%] text-center'>{rank.nickname}</span>
      <span className='w-[30%] text-center'>{rank.score}</span>
    </div>
  );
};

export default RankItem;
