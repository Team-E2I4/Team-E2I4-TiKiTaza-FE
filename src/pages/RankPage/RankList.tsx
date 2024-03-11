import { MemberRankResponse } from '@/generated';
import RankItem from './RankItem';

export interface RankListProps {
  rankData: MemberRankResponse[] | undefined;
}

const RankList = ({ rankData }: RankListProps) => {
  return (
    <div className='flex flex-col rounded-2xl overflow-hidden'>
      <div className='flex gap-2 justify-center font-bold font-[Giants-Inline] text-5xl py-4 px-4 border-b border-gray-200'>
        <span className='w-[20%] text-center'>순위</span>
        <span className='w-[20%] text-center'>닉네임</span>
        <span className='w-[20%] text-center'>평균 타수</span>
        <span className='w-[20%] text-center'>평균 정확도</span>
        <span className='w-[20%] text-center'>점수</span>
      </div>
      {rankData?.map((rank, index) => (
        <RankItem
          key={rank.memberId}
          rank={rank}
          index={index}
        />
      ))}
    </div>
  );
};

export default RankList;
