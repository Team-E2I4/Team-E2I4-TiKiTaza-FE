import GameRoomHeader from './GameRoomHeader';

interface I_gameRoomUserList {
  userName: string;
  rank: number;
  userImage: string;
  userImageFallbackDelay: number;
}

interface GameRoomPageProps {
  gameRoomId: string;
  gameRoomName: string;
  gameMode: string;
  gameRoomMaximumHeadCount: number;
  gameRoomUserList: Array<I_gameRoomUserList>;
}

const GameRoomPage = (props: GameRoomPageProps) => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-[6rem]'>
      <GameRoomHeader {...props} />
    </div>
  );
};

export default GameRoomPage;
