import { CompatClient } from '@stomp/stompjs';
import storageFactory from '@/utils/storageFactory';

const GameReadyAndStart = ({ ws }: { ws: CompatClient }) => {
  const { getItem } = storageFactory(localStorage);

  const token = getItem('token', '');
  const connectHeaders = {
    Authorization: 'Bearer ' + token,
  };
  return (
    <button
      onClick={() => {
        ws.send(`/to/game-room/10/ready`, connectHeaders, '입장~');
      }}
      className={`w-[24.1rem] h-[10rem] flex justify-center items-center text-[2rem] bg-coral-50 hover:bg-coral-100 transition-all duration-300 shadow-md shadow-black/50 rounded-[2.5rem]`}>
      {/* TODO: 전부 준비 완료 되면 시작 버튼 색상 bg-coral-100으로 변경 */}
      시작
    </button>
  );
};

export default GameReadyAndStart;
