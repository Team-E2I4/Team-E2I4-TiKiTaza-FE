import { FallbackProps } from 'react-error-boundary';

const EnterRoomErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      방 입장시 에러발생|
      {error.response.data.errorCode}|{error.response.data.errorMessage}|
      {error.response.data?.validation?.title}|
      <button onClick={resetErrorBoundary}>오류초기화</button>
    </div>
  );
};

export default EnterRoomErrorFallback;
