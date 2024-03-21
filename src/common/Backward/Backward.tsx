import backward from '@/assets/backward.webp';

const Backward = ({
  handleClickBackward,
}: {
  handleClickBackward: () => void;
}) => {
  return (
    <button
      type='button'
      onClick={handleClickBackward}>
      <img
        src={backward}
        className='w-[4.8rem]'
        alt='뒤로가기'
      />
    </button>
  );
};

export default Backward;
