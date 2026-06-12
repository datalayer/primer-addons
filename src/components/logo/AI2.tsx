/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { type ThemeVariant } from '../../theme';
import { getLogoColors } from './DatalayerLogo';

export interface AI2Props extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  /** Colour of the "I" glyph. */
  primaryColor?: string;
  /** Colour of the "A" glyph. */
  secondaryColor?: string;
}

/**
 * Alternate AI glyph mark.
 *
 * A is rendered with an oblique left bar, a right vertical bar,
 * and a horizontal crossbar.
 * I is rendered as a simple vertical bar.
 */
export const AI2 = forwardRef<SVGSVGElement, AI2Props>(function AI2(
  {
    size = 24,
    variant = 'datalayer',
    colorMode = 'light',
    primaryColor,
    secondaryColor,
    ...svgProps
  },
  ref,
) {
  const themed = getLogoColors(variant, colorMode);
  const resolvedPrimary = primaryColor ?? themed.primary;
  const resolvedSecondary = secondaryColor ?? themed.textColor;
  const barWidth = 3.1;
  const leftBarBottomInnerX = -2.2 + barWidth;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-2.2 0 26.2 24"
      width={size}
      height={size}
      role="img"
      aria-label="AI2"
      ref={ref}
      {...svgProps}
    >
      {/* I glyph: vertical bar */}
      <path
        d={`M15.35 3.5h${barWidth}V20h-${barWidth}z`}
        fill={resolvedPrimary}
      />

      {/* A glyph: oblique left bar + right vertical bar + horizontal crossbar */}
      <path
        d={`M-2.2 20 9.8 3.5h${barWidth}L${leftBarBottomInnerX} 20H-2.2z`}
        fill={resolvedSecondary}
      />
      <path
        d={`M10.35 3.5h${barWidth}V20h-${barWidth}z`}
        fill={resolvedSecondary}
      />
      <path
        d="M3.5 12.95h9.6v2.75H3.5z"
        fill={resolvedSecondary}
      />
    </svg>
  );
});

export default AI2;
