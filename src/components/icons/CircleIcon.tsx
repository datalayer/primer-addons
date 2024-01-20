import { useTheme } from '@primer/react';
import { CircleCurrentColorIcon } from '@datalayer/icons-react';

const COLORS: any = {
  'danger': 'danger',
}

export type CircleIconProps = {
  color?: string;
  variant?: 'fg' | 'default' | 'muted' | 'onEmphasis' | 'subtle';
}

export const CircleIcon = ({
  color = 'white',
  variant = 'fg',
}: CircleIconProps) => {
  const { theme } = useTheme();
  return (
    <CircleCurrentColorIcon fill={theme?.colors[COLORS[color!]][variant!] ?? color ?? 'white'}/>
  )
}

export default CircleIcon;
