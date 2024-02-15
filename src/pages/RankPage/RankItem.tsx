interface RankItemProps {
  rank: {
    nickname: string;
    score: number;
  };
  index: number;
}

const RankItem = ({ rank, index }: RankItemProps) => {
  return (
    <div className='flex gap-2 items-center font-bold text-4xl bg-[#FFF4DC] py-2 px-4 border-b'>
      <span className='w-[20%] text-center'>
        {index === 0
          ? '🥇'
          : index === 1
            ? '🥈'
            : index === 2
              ? '🥉'
              : index + 1}
      </span>
      <span className='w-[20%] text-center'>{rank.nickname}</span>
      <span className='w-[20%] text-center'>{rank.score}</span>
    </div>
  );
};

export default RankItem;
