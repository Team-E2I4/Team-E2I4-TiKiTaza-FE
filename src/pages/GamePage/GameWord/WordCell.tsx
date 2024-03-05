import { ReactNode } from 'react';

const positions = ['center', 'left', 'right'];
const margins = ['mt-auto', 'mb-auto'];
const WordCell = ({ rd, children }: { rd: number; children: ReactNode }) => {
  const randomPosition = positions[rd];
  const randomMargin = margins[rd % 2];
  return (
    <span className={`p-1 text-${randomPosition} ${randomMargin}`}>
      {children}
    </span>
  );
};
export default WordCell;
