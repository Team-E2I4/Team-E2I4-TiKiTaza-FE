const GameReadyAndStart = () => {
  return (
    <button
      className={`w-[28.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
      시작
    </button>
  );
};

export default GameReadyAndStart;
