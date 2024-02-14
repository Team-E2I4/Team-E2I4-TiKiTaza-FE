import logo_big_shadow from '@/asssets/logo_big_shadow.png';

const StartPage = () => {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center gap-[2rem]'>
      <img
        alt='티키타자 로고'
        src={logo_big_shadow}
        className='object-cover h-[55rem]'
      />
      <button className='w-[33.9rem] h-[8.8rem] font-[Giants-Inline] text-[3.2rem] shadow-xl bg-green-100 hover:bg-green-200 transition-all rounded-full'>
        시작하기
      </button>
      <span className='font-bold font-[Giants-Inline] text-[3.2rem]'>
        당신의 손가락이 빠르고 정확한지 확인해보세요!
      </span>
    </main>
  );
};

export default StartPage;
