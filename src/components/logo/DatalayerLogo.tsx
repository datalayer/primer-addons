/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import {
  datalayerColors,
  spatialColors,
  lovelyColors,
  matrixColors,
  type ThemeVariant,
} from '../../theme';

export interface LogoColorPair {
  primary: string;
  secondary: string;
}

export const THEME_LOGO_COLORS: Record<
  ThemeVariant,
  { light: LogoColorPair; dark: LogoColorPair }
> = {
  datalayer: {
    light: {
      primary: datalayerColors.greenBrand,
      secondary: datalayerColors.greenText,
    },
    dark: {
      primary: datalayerColors.greenBright,
      secondary: datalayerColors.greenAccent,
    },
  },
  spatial: {
    light: {
      primary: spatialColors.indigoBrand,
      secondary: spatialColors.indigoText,
    },
    dark: {
      primary: spatialColors.indigoBright,
      secondary: spatialColors.indigoAccent,
    },
  },
  lovely: {
    light: {
      primary: lovelyColors.roseBrand,
      secondary: lovelyColors.roseText,
    },
    dark: {
      primary: lovelyColors.roseBright,
      secondary: lovelyColors.roseAccent,
    },
  },
  matrix: {
    light: {
      primary: matrixColors.greenBrand,
      secondary: matrixColors.greenText,
    },
    dark: {
      primary: matrixColors.greenGlow,
      secondary: matrixColors.greenPhosphor,
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
  primaryColor?: string;
  secondaryColor?: string;
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
      primaryColor = 'currentColor',
      secondaryColor = 'currentColor',
      ...svgProps
    },
    ref,
  ) {
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
        {BARS.map(({ y, secondaryWidth, primaryWidth }) => (
          <g key={y}>
            <rect
              x={0}
              y={y}
              width={secondaryWidth}
              height={BAR_HEIGHT}
              fill={secondaryColor}
            />
            <rect
              x={secondaryWidth}
              y={y}
              width={primaryWidth}
              height={BAR_HEIGHT}
              fill={primaryColor}
            />
          </g>
        ))}
      </svg>
    );
  },
);

export default DatalayerLogo;
