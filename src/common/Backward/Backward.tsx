import { useNavigate } from 'react-router-dom';
import backward from '@/assets/backward.png';

const Backward = () => {
  // TODO: 예외처리 사항 필요하면 추후에 추가
  const navigate = useNavigate();
  const goPreviousPage = () => {
    navigate('/main');
    window.location.reload();
  };

  return (
    <button
      type='button'
      onClick={goPreviousPage}>
      <img
        src={backward}
        className='w-[4.8rem]'
        alt='뒤로가기'
      />
    </button>
  );
};

export default Backward;
