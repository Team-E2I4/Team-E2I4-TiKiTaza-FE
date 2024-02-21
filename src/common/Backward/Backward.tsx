import backward from '@/assets/backward.png';

const Backward = ({
  handleClickBackward,
}: {
  handleClickBackward: () => void;
}) => {
  // TODO: 예외처리 사항 필요하면 추후에 추가
  return (
    <button
      onClick={handleClickBackward}
      type='button'>
      <img
        src={backward}
        className='w-[4.8rem]'
        alt='뒤로가기'
      />
    </button>
  );
};

export default Backward;
