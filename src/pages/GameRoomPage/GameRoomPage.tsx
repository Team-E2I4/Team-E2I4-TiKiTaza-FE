import GameRoomFooter from './GameRoomFooter';
import GameRoomHeader from './GameRoomHeader';
import GameRoomUserList from './GameRoomUserList';

export interface I_gameRoomUserCard {
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
  gameRoomUserList: Array<I_gameRoomUserCard>;
}

const GameRoomPage = (props: GameRoomPageProps) => {
  // DummyData for Test
  const {
    gameRoomUserList = [
      {
        userName: '신종욱',
        rank: 1,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱2',
        rank: 2,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱3',
        rank: 3,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱4',
        rank: 4,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱5',
        rank: 5,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱6',
        rank: 6,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱7',
        rank: 7,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
      {
        userName: '신종욱8',
        rank: 8,
        userImage:
          'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
        userImageFallbackDelay: 6000,
      },
    ],
  } = props;
  return (
    <div className='w-full flex flex-col justify-center items-center gap-[6rem]'>
      <GameRoomHeader {...props} />
      <GameRoomUserList gameRoomUserList={gameRoomUserList} />
      <GameRoomFooter />
    </div>
  );
};

export default GameRoomPage;
