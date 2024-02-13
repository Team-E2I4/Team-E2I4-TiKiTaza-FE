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
    <div className='flex flex-row items-center gap-20 pb-12'>
      <img
        src={backward}
        className='w-[4.8rem]'
      />
      <div className='w-[40rem] text-ellipsis overflow-hidden whitespace-nowrap text-4xl'>
        {roomName}
      </div>
      <div className='grow'>참여 {participants}명</div>
      <div>
        🏁 {round} / {roundTotal}
      </div>
    </div>
  );
};
