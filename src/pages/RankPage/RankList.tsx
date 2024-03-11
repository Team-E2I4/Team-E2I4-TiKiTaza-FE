import RankItem from './RankItem';

export interface RankProps {
  id: number;
  nickname: string;
  score: number;
}

interface RankListProps {
  data: RankProps[];
}

const RankList = ({ data }: RankListProps) => {
  return (
    <div className='flex flex-col rounded-2xl overflow-hidden'>
      <div className='flex gap-2 justify-center font-bold font-[Giants-Inline] text-5xl py-4 px-4 border-b border-gray-200'>
        <span className='w-[30%] text-center'>순위</span>
        <span className='w-[40%] text-center'>닉네임</span>
        <span className='w-[30%] text-center'>점수</span>
      </div>
      {data.map((rank, index) => (
        <RankItem
          key={rank.id}
          rank={rank}
          index={index}
        />
      ))}
    </div>
  );
};

export default RankList;
