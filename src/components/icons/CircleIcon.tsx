/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { CircleCurrentColorIcon } from '@datalayer/icons-react';

/** Primer's colour roles: a circle in one of them takes the theme's colour for it. */
export const CIRCLE_ICON_ROLES = ['accent', 'success', 'attention', 'severe', 'danger', 'done', 'sponsors', 'neutral', 'open', 'closed'] as const;

export type CircleIconRole = (typeof CIRCLE_ICON_ROLES)[number];

export type CircleIconProps = {
  /** A colour role (`accent`, `success`…), which follows the theme, or any CSS colour. */
  color?: CircleIconRole | (string & {});
  /** Which of the role's colours: its foreground by default, or its emphasis, muted or subtle background. */
  variant?: 'fg' | 'default' | 'muted' | 'onEmphasis' | 'subtle' | 'emphasis';
};

const isRole = (color: string): color is CircleIconRole => (CIRCLE_ICON_ROLES as readonly string[]).includes(color);

/**
 * The theme's colour of a role, as a CSS custom property, so the circle
 * changes with the theme and the colour mode without a re-render.
 */
export function circleIconColor(color: string, variant: CircleIconProps['variant'] = 'fg'): string {
  if (!isRole(color)) {
    return color;
  }
  switch (variant) {
    case 'onEmphasis':
      return 'var(--fgColor-onEmphasis)';
    case 'emphasis':
    case 'default':
      return `var(--bgColor-${color}-emphasis)`;
    case 'muted':
      return `var(--bgColor-${color}-muted)`;
    case 'subtle':
      return `var(--bgColor-${color}-muted, var(--bgColor-${color}-subtle))`;
    default:
      return `var(--fgColor-${color})`;
  }
}

export const CircleIcon = ({ color = 'accent', variant = 'fg' }: CircleIconProps) => {
  const fill = circleIconColor(color, variant);
  return (
    <span style={{ color: fill, display: 'inline-flex' }}>
      <CircleCurrentColorIcon />
    </span>
  );
};

export default CircleIcon;
