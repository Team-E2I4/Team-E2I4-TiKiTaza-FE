import { useMemo } from 'react';

interface GameRoomListItemProps {
  roomNumber: number;
  title: string;
  mode: string;
  headCount: number;
}

const GameRoomListItem = ({
  roomNumber,
  title,
  mode,
  headCount,
}: GameRoomListItemProps) => {
  const arrayedProps = useMemo(
    () => [roomNumber, title, mode, headCount],
    [roomNumber, title, mode, headCount]
  );

  return (
    <li>
      {arrayedProps.map((category, i) => (
        <>
          <span key={category}>{category}</span>
          {i !== arrayedProps.length - 1 && <span>ㅣ</span>}
        </>
      ))}
    </li>
  );
};

export default GameRoomListItem;
