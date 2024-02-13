import backward from '@/asssets/backward.png';

interface IngameHeaderProps {
  roomName: string;
  participants: number;
  round: number;
  roundTotal: number;
}
export const IngameHeader = ({
  roomName,
  participants,
  round,
  roundTotal,
}: IngameHeaderProps) => {
  return (
    <div className='flex flex-row'>
      <img
        src={backward}
        className='w-[4.8rem]'
      />
      <div>{roomName}</div>
      <div className='grow'>참여 {participants}명</div>
      <div>
        🏁 {round} / {roundTotal}
      </div>
    </div>
  );
};
