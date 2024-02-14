import backward from '@/asssets/backward.png';

interface IngameHeaderProps {
  roomName?: string;
  participants?: number;
  round?: number;
  roundTotal?: number;
}
const IngameHeader = ({
  roomName = '테스트방 이름이 길어진다면 1234567898765',
  participants = 8,
  round = 2,
  roundTotal = 5,
}: IngameHeaderProps) => {
  return (
    <div className='flex flex-row items-center gap-20 pb-12'>
      <img
        src={backward}
        alt='게임 나가기'
        className='w-[4.8rem]'
      />
      <div className='w-[40rem] truncate text-4xl'>{roomName}</div>
      <div className='grow'>참여 {participants}명</div>
      <div>
        🏁 {round} / {roundTotal}
      </div>
    </div>
  );
};
export default IngameHeader;
