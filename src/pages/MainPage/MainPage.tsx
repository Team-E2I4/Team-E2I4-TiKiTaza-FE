const MainPage = () => {
  return (
    <main className='flex pb-[4rem]'>
      <section className='flex flex-col gap-[3rem] w-[25rem]'>
        <div className='bg-yellow-100 h-[50rem] w-full'>접속자</div>
        <div className='bg-yellow-100 h-[4.5rem] w-full'>전체 랭킹 보기</div>
        <div className='bg-yellow-100 h-[20.5rem] w-full'>유저 프로필</div>
      </section>
      <section>
        <div className='bg-yellow-100'>검색 or 서버이름</div>
        <div className='bg-yellow-100'>방 만들기</div>
        <div className='bg-yellow-100'>방 목록</div>
      </section>
    </main>
  );
};

export default MainPage;
