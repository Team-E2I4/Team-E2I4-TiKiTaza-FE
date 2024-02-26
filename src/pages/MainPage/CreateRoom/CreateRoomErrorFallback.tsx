import { FallbackProps } from 'react-error-boundary';

const CreateRoomErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div>
      에러발생 |
      <span>
        {error.response.data.errorCode}|{error.response.data.errorMessage}|
        {error.response.data?.validation?.title}|
      </span>
      <button onClick={() => resetErrorBoundary()}>리셋 에러</button>
    </div>
  );
};

export default CreateRoomErrorFallback;
