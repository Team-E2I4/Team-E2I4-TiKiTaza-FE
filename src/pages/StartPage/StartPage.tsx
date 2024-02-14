import logo_big from '@/asssets/logo_big.png';

const StartPage = () => {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center gap-[2rem]'>
      <img
        src={logo_big}
        className='object-cover h-[55rem]'
      />
      <button className='w-[33.9rem] h-[8.8rem] text-[3.2rem] shadow-xl bg-green-100 border-solid border-2 border-black rounded-full'>
        시작하기
      </button>
      <span className='font-bold text-[3.2rem]'>
        당신의 손가락이 빠르고 정확한지 확인해보세요!
      </span>
    </main>
  );
};

export default StartPage;
