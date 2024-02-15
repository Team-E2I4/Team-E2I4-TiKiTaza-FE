import { ComponentProps } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: ComponentProps<'hr'>['className'];
}

const Divider = ({
  orientation = 'horizontal',
  className = '',
}: DividerProps) => {
  const orientationStyle = new Map([
    ['horizontal', 'h-[0.1rem] w-full'],
    ['vertical', 'w-[0.1rem] h-full'],
  ]);
  return (
    <hr
      className={`border-[1rem]  ${orientationStyle.get(orientation)} ${className}`}></hr>
  );
};

export default Divider;
