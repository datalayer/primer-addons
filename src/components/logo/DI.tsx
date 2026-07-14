/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { type ThemeVariant } from '../../theme';
import { getLogoColors } from './DatalayerLogo';

export interface DIProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  /** Colour of the "I" glyph. */
  primaryColor?: string;
  /** Colour of the "D" glyph. */
  secondaryColor?: string;
}

/**
 * DI glyph mark.
 *
 * Uses the same public API and semantic color mapping as AI:
 * primaryColor styles the "I", secondaryColor styles the "D".
 */
export const DI = forwardRef<SVGSVGElement, DIProps>(function DI(
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

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label="DI"
      ref={ref}
      {...svgProps}
    >
      <path
        d="M2 3.932H5V20.068075H2ZM3.5 3.932H6.5L12.933 20.068075H9.933ZM2 17.068075H11.4V20.068075H2Z"
        fill={resolvedSecondary}
        strokeWidth={0.25}
      />
      <path
        d="m10.788825 3.932 6.43325 16.136075h3.5279L14.316725 3.932H10.788825Z"
        fill={resolvedPrimary}
        strokeWidth={0.25}
      />
    </svg>
  );
});

export default DI;