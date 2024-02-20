import { IconProps } from '@radix-ui/react-icons/dist/types';
import { FC } from 'react';

interface WrappedIconProps extends IconProps {
  IconComponent: FC<IconProps>;
}

const WrappedIcon = ({ IconComponent, className }: WrappedIconProps) => (
  <IconComponent className={className} />
);

export default WrappedIcon;
