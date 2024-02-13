import * as Avatar from '@radix-ui/react-avatar';

const MainPage = () => {
  /* bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 클래스가 반복되어서 재사용 필요? */
  return (
    <main className='flex pb-[4rem] gap-[3rem]'>
      <section className='flex flex-col gap-[3rem] w-[25rem]'>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[50rem] w-full'>
          접속자
        </div>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[4.5rem] w-full'>
          전체 랭킹 보기
        </div>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 h-[18rem] w-full'>
          유저 프로필
          <Avatar.Root>
            <Avatar.Image
              className='size-[5rem] rounded-full'
              src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
              alt='프로필 이미지'
            />
          </Avatar.Root>
        </div>
      </section>
      <section className='flex-1 grid grid-cols-2 grid-rows-[5rem_auto] grid-flow-col gap-[3rem]'>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100'>
          검색 or 서버이름
        </div>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-1'>
          방 만들기
        </div>
        <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
          방 목록
        </div>
      </section>
    </main>
  );
};

export default MainPage;
