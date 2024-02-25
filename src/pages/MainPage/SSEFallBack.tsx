import { SSEErrorType } from '@/hooks/useSSE';

const SSEFallBack = ({ error }: { error?: SSEErrorType }) => {
  return (
    //원래 방 목록 스타일과 겹침. 중복되는 스타일 수정 필요
    <div className='bg-white rounded-[0.5rem] border-solid border-[0.3rem] border-green-100 row-start-2 col-start-1 col-span-2'>
      방 목록이 없거나 에러 발생!
      <span>{error?.status}</span>
    </div>
  );
};

export default SSEFallBack;
