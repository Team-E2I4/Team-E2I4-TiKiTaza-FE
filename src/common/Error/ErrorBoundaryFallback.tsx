import { useNavigate } from 'react-router-dom';

const ErrorBoundaryFallback = () => {
  const navigate = useNavigate();
  const gotoMain = () => {
    navigate('/main', { replace: true });
    navigate(0);
  };
  return (
    <div>
      <div>게임 연결에 오류가 발생했습니다!!</div>
      <button
        onClick={gotoMain}
        className='underline'>
        {' '}
        다시 연결하기
      </button>
    </div>
  );
};
export default ErrorBoundaryFallback;
