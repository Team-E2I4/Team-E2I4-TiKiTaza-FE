interface RankItemProps {
  rank: {
    nickname: string;
    score: number;
  };
  index: number;
}

const RankItem = ({ rank, index }: RankItemProps) => {
  return (
    <div>
      <span>{index + 1}</span>
      <span> {rank.nickname} </span>
      <span> {rank.score} </span>
    </div>
  );
};

export default RankItem;
