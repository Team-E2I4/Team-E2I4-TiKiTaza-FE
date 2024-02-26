import { AxiosError } from 'axios';
import { FallbackProps } from 'react-error-boundary';

const CreateRoomErrorFallback = ({ error }: { error: FallbackProps }) => {
  return (
    <div>
      에러발생
      {error instanceof AxiosError && <span>{error.response?.data}</span>}
    </div>
  );
};

export default CreateRoomErrorFallback;
