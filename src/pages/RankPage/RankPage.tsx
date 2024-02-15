import RankList from './RankList';

const RankPage = () => {
  return (
    <div className='flex flex-col gap-[4rem] w-[60%] mx-auto'>
      <div className='flex gap-[12rem] justify-center font-bold font-[Giants-Inline] text-4xl'>
        <div className='bg-coral-100 rounded-[1rem] px-6 py-3'>전체</div>
        <div className='bg-coral-100 rounded-[1rem] px-6 py-3'>코드</div>
        <div className='bg-coral-100 rounded-[1rem] px-6 py-3'>문장</div>
        <div className='bg-coral-100 rounded-[1rem] px-6 py-3'>단어</div>
      </div>
      <RankList />
    </div>
  );
};

export default RankPage;
