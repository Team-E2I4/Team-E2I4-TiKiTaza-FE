import { ReactNode } from 'react';

const positions = ['center', 'left', 'right'];
const margins = ['mt-auto', 'mb-auto'];

const WordCell = ({
  randomIndex,
  children,
}: {
  randomIndex: number;
  children: ReactNode;
}) => {
  const randomPosition = positions[randomIndex];
  const randomMargin = margins[randomIndex % 2];
  return (
    <span className={`p-1 text-${randomPosition} ${randomMargin}`}>
      {children}
    </span>
  );
};
export default WordCell;
