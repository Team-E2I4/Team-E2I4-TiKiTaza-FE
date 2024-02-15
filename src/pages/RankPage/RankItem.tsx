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
      <span className='w-[30%] text-center'>
        {index === 0
          ? '🥇'
          : index === 1
            ? '🥈'
            : index === 2
              ? '🥉'
              : index + 1}
      </span>
      <span className='w-[40%] text-center'>{rank.nickname}</span>
      <span className='w-[30%] text-center'>{rank.score}</span>
    </div>
  );
};

export default RankItem;
