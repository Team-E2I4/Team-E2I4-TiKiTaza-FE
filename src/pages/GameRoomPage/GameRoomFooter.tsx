const GameRoomFooter = () => {
  return (
    <>
      <footer className='w-[114.8rem] flex gap-[5rem]'>
        <div className='w-[61.3rem] h-[15rem] flex bg-beige-100 shadow-md shadow-black/50 rounded-[2.5rem]'>
          <p className='w-[80%] my-[2.5rem] ml-[2rem] overflow-y-scroll text-center'>
            게임 모드 설명이 매우 길어 진다면 어떻게 될까요. 궁금해집니다. 한번
            알아볼까요? 한번 알아볼까요???
            <br /> 한번 알아볼까요
            <br /> 한번 알아볼까요
          </p>
          <div className='w-[20%] flex justify-center items-center'>
            <button className='w-[8rem] aspect-square text-white text-[2rem] bg-gray-300/90 hover:bg-gray-200 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
              변경
            </button>
          </div>
        </div>
        <button className='w-[28.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]'>
          링크 초대
        </button>
        <button
          className={`w-[28.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
          {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
          시작
        </button>
      </footer>
    </>
  );
};

export default GameRoomFooter;
