/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, useId, type SVGProps } from 'react';
import {
  datalayerColors,
  spatialColors,
  lovelyColors,
  matrixColors,
  earthColors,
  type ThemeVariant,
} from '../../theme';

export interface LogoColorPair {
  primary: string;
  secondary: string;
  /** Colour for the "DATA" part of the wordmark (gray in the original brand logo). */
  textColor: string;
  /** Gradient [start, end] for primary (left) bars. */
  primaryGradient: [start: string, end: string];
  /** Gradient [start, end] for secondary (right) bars. */
  secondaryGradient: [start: string, end: string];
}

/**
 * Gradient pattern derived from the original brand logo SVG:
 *   - Left bars:  accent → brand (bright → mid)
 *   - Right bars: hover  → text  (dark  → mid)
 *
 * This mapping is consistent across all four themes.
 */
export const THEME_LOGO_COLORS: Record<
  ThemeVariant,
  { light: LogoColorPair; dark: LogoColorPair }
> = {
  datalayer: {
    light: {
      primary: datalayerColors.greenAccent,
      secondary: datalayerColors.greenText,
      textColor: datalayerColors.gray,
      primaryGradient: [datalayerColors.greenAccent, datalayerColors.greenBrand],
      secondaryGradient: [datalayerColors.greenHover, datalayerColors.greenBrand],
    },
    dark: {
      primary: datalayerColors.greenBright,
      secondary: datalayerColors.greenAccent,
      textColor: datalayerColors.gray,
      primaryGradient: [datalayerColors.greenAccent, datalayerColors.greenBrand],
      secondaryGradient: [datalayerColors.greenHover, datalayerColors.greenText],
    },
  },
  spatial: {
    light: {
      primary: spatialColors.indigoBrand,
      secondary: spatialColors.indigoText,
      textColor: spatialColors.gray,
      primaryGradient: [spatialColors.indigoBright, spatialColors.indigoBrand],
      secondaryGradient: [spatialColors.indigoHover, spatialColors.indigoAccent],
    },
    dark: {
      primary: spatialColors.indigoBright,
      secondary: spatialColors.indigoAccent,
      textColor: spatialColors.gray,
      primaryGradient: [spatialColors.indigoBright, spatialColors.indigoBrand],
      secondaryGradient: [spatialColors.indigoHover, spatialColors.indigoAccent],
    },
  },
  lovely: {
    light: {
      primary: lovelyColors.roseBrand,
      secondary: lovelyColors.roseText,
      textColor: lovelyColors.gray,
      primaryGradient: [lovelyColors.roseBright, lovelyColors.roseBrand],
      secondaryGradient: [lovelyColors.roseHover, lovelyColors.roseAccent],
    },
    dark: {
      primary: lovelyColors.roseBright,
      secondary: lovelyColors.roseAccent,
      textColor: lovelyColors.gray,
      primaryGradient: [lovelyColors.roseBright, lovelyColors.roseBrand],
      secondaryGradient: [lovelyColors.roseHover, lovelyColors.roseAccent],
    },
  },
  matrix: {
    light: {
      primary: matrixColors.greenBrand,
      secondary: matrixColors.greenText,
      textColor: matrixColors.gray,
      primaryGradient: [matrixColors.greenGlow, matrixColors.greenBrand],
      secondaryGradient: [matrixColors.greenHover, matrixColors.greenAccent],
    },
    dark: {
      primary: matrixColors.greenGlow,
      secondary: matrixColors.greenPhosphor,
      textColor: matrixColors.gray,
      primaryGradient: [matrixColors.greenGlow, matrixColors.greenBrand],
      secondaryGradient: [matrixColors.greenHover, matrixColors.greenAccent],
    },
  },
  earth: {
    light: {
      primary: earthColors.oceanBrand,
      secondary: earthColors.oceanText,
      textColor: earthColors.gray,
      primaryGradient: [earthColors.oceanAccent, earthColors.oceanBrand],
      secondaryGradient: [earthColors.oceanHover, earthColors.oceanText],
    },
    dark: {
      primary: earthColors.oceanBright,
      secondary: earthColors.oceanAccent,
      textColor: earthColors.gray,
      primaryGradient: [earthColors.oceanBright, earthColors.oceanBrand],
      secondaryGradient: [earthColors.oceanHover, earthColors.oceanAccent],
    },
  },
};

export function getLogoColors(
  variant: ThemeVariant = 'datalayer',
  colorMode: 'light' | 'dark' | 'auto' = 'light',
): LogoColorPair {
  const mode = colorMode === 'auto' ? 'light' : colorMode;
  return THEME_LOGO_COLORS[variant]?.[mode] ?? THEME_LOGO_COLORS.datalayer.light;
}

export interface DatalayerLogoProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  secondaryColor?: string;
  /** Explicit gradient [start, end] for primary (left) bars. */
  primaryGradient?: [start: string, end: string];
  /** Explicit gradient [start, end] for secondary (right) bars. */
  secondaryGradient?: [start: string, end: string];
  /** Enable horizontal gradients matching the original brand logo. Default `true`. */
  gradient?: boolean;
}

const BAR_HEIGHT = 25;
const BARS: Array<{ y: number; secondaryWidth: number; primaryWidth: number }> = [
  { y: 0, secondaryWidth: 30, primaryWidth: 70 },
  { y: 37.5, secondaryWidth: 50, primaryWidth: 50 },
  { y: 75, secondaryWidth: 70, primaryWidth: 30 },
];

export const DatalayerLogo = forwardRef<SVGSVGElement, DatalayerLogoProps>(
  function DatalayerLogo(
    {
      size = 16,
      variant = 'datalayer',
      colorMode = 'light',
      primaryColor,
      secondaryColor,
      primaryGradient,
      secondaryGradient,
      gradient = true,
      ...svgProps
    },
    ref,
  ) {
    const themed = getLogoColors(variant, colorMode);
    const resolvedPrimary = primaryColor ?? themed.primary;
    const resolvedSecondary = secondaryColor ?? themed.secondary;
    const uid = useId().replace(/:/g, '');

    const [primaryStart, primaryEnd] = primaryGradient ?? themed.primaryGradient;
    const [secondaryStart, secondaryEnd] = secondaryGradient ?? themed.secondaryGradient;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
        aria-hidden="true"
        ref={ref}
        {...svgProps}
      >
        {gradient && (
          <defs>
            <linearGradient id={`${uid}-p`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={primaryStart} />
              <stop offset="1" stopColor={primaryEnd} />
            </linearGradient>
            <linearGradient id={`${uid}-s`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={secondaryStart} />
              <stop offset="1" stopColor={secondaryEnd} />
            </linearGradient>
          </defs>
        )}
        {BARS.map(({ y, secondaryWidth, primaryWidth }) => (
          <g key={y}>
            <rect
              x={0}
              y={y}
              width={secondaryWidth}
              height={BAR_HEIGHT}
              fill={gradient ? `url(#${uid}-p)` : resolvedPrimary}
            />
            <rect
              x={secondaryWidth}
              y={y}
              width={primaryWidth}
              height={BAR_HEIGHT}
              fill={gradient ? `url(#${uid}-s)` : resolvedSecondary}
            />
          </g>
        ))}
      </svg>
    );
  },
);

export default DatalayerLogo;
