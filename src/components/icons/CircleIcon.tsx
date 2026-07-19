import { useTheme } from '@primer/react';
import { CircleCurrentColorIcon } from '@datalayer/icons-react';

export type CircleIconProps = {
  color?: string;
  variant?: 'fg' | 'default' | 'muted' | 'onEmphasis' | 'subtle';
}

export const CircleIcon = ({
  color = 'white',
  variant = 'fg',
}: CircleIconProps) => {
  const { theme } = useTheme();
  const colorGroup = (theme?.colors as Record<string, unknown> | undefined)?.[color];
  const resolvedColor =
    colorGroup && typeof colorGroup === 'object'
      ? (colorGroup as Record<string, string | undefined>)[variant] ??
        (colorGroup as Record<string, string | undefined>).fg
      : undefined;

  return (
    <CircleCurrentColorIcon
      fill={resolvedColor ?? color ?? 'currentColor'}
      color={resolvedColor ?? color ?? 'currentColor'}
    />
  )
}

export default CircleIcon;
