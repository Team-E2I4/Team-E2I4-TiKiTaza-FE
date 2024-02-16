import { DUMMY_DATA } from '../RankPage/RankData';
import RankList from '../RankPage/RankList';

const GameFinishPage = () => {
  return (
    <div className='flex flex-col gap-[8rem] items-center'>
      <section>
        <span className='text-3xl font-bold font-[Giants-Inline]'>
          3초 뒤 자동으로 로비로 이동합니다...
        </span>
      </section>
      <section className='flex gap-[10rem]'>
        <div className='flex flex-1 justify-center items-end'>
          <div className='bg-[#FFF4DC] h-[21rem] w-[12rem] flex items-center justify-center shadow text-5xl font-bold'>
            2
          </div>
          <div className='bg-[#FFF4DC] h-[30rem] w-[12rem] flex items-center justify-center shadow text-5xl font-bold'>
            1
          </div>
          <div className='bg-[#FFF4DC] h-[16rem] w-[12rem] flex items-center justify-center shadow text-5xl font-bold'>
            3
          </div>
        </div>
        <div className='flex-1'>
          <RankList data={DUMMY_DATA} />
        </div>
      </section>
      <section className='flex gap-10 font-[Giants-Inline]'>
        <div className='bg-coral-100 px-6 py-6 rounded-[12px] text-3xl font-bold'>
          로비로 나가기
        </div>
        <div className='bg-coral-100 px-6 py-6 rounded-[12px] text-3xl font-bold'>
          다시하기
        </div>
      </section>
    </div>
  );
};

export default GameFinishPage;
