import { ComponentProps } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: ComponentProps<'hr'>['className'];
  variant?: 'solid' | 'dashed';
  thickness?: string;
  size?: string;
}

const Divider = ({
  orientation = 'horizontal',
  className = '',
  variant = 'solid',
  thickness = '1rem',
  size = '100%',
}: DividerProps) => {
  const orientationStyle = new Map([
    [
      'horizontal',
      `w-[${size}] h-[${thickness}] border-t-[${thickness}] border-${variant}`,
    ],
    [
      'vertical',
      `h-[${size}] w-[${thickness}] border-r-[${thickness}] border-${variant}`,
    ],
  ]);
  return (
    <div
      className={`border-black ${orientationStyle.get(orientation)} ${className}`}></div>
  );
};

export default Divider;
