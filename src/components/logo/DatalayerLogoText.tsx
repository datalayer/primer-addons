/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { getLogoColors } from './DatalayerLogo';
import { DatalayerText } from './DatalayerText';
import { type ThemeVariant } from '../../theme';

export interface DatalayerLogoTextProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  scale?: number;
  colorMode?: 'light' | 'dark' | 'auto';
  variant?: ThemeVariant;
  primaryColor?: string;
  secondaryColor?: string;
  /** Colour for the "DATA" part of the wordmark (defaults to theme gray). */
  textColor?: string;
  textSizeMultiplier?: number;
  /**
   * When true, render logo mark first then text.
   * When false (default), render text first then logo mark.
   */
  inverse?: boolean;
}

/**
 * Datalayer icon + wordmark based on official brand proportions.
 * Uses themed colors by default and allows explicit color overrides.
 */
export const DatalayerLogoText = forwardRef<
  SVGSVGElement,
  DatalayerLogoTextProps
>(function DatalayerLogoText(
  {
    size = 25,
    scale = 1,
    colorMode = 'light',
    variant = 'datalayer',
    primaryColor,
    secondaryColor,
    textColor,
    // 2.380655 ~= 25 / (0.7 * 15.00187)
    // This makes the wordmark glyph height match the 25-unit icon height.
    textSizeMultiplier = 2.380655,
    inverse = false,
    ...svgProps
  },
  ref,
) {
  const themed = getLogoColors(variant, colorMode);
  const primary = primaryColor ?? themed.primary;
  const secondary = secondaryColor ?? themed.secondary;
  // "DATA" part of the wordmark defaults to the themed gray.
  const dataTextColor = textColor ?? themed.textColor;

  const baseHeight = size;
  const baseWidth = (161.672 / 25) * size;
  const height = baseHeight * scale;
  const width = baseWidth * scale;

  const iconGroup = (
    <g transform="translate(0 0)">
      <rect x="0" y="0" width="10" height="6.25" fill={primary} />
      <rect x="10" y="0" width="15" height="6.25" fill={secondary} />

      <rect x="0" y="9.375" width="15" height="6.25" fill={primary} />
      <rect x="15" y="9.375" width="10" height="6.25" fill={secondary} />

      <rect x="0" y="18.75" width="20" height="6.25" fill={primary} />
      <rect x="20" y="18.75" width="5" height="6.25" fill={secondary} />
    </g>
  );

  const logoFirst = (
    <>
      {iconGroup}
      <DatalayerText
        primaryColor={primary}
        secondaryColor={dataTextColor}
        sizeMultiplier={textSizeMultiplier}
        x={16}
      />
    </>
  );

  const textFirst = (
    <>
      <DatalayerText
        primaryColor={primary}
        secondaryColor={dataTextColor}
        sizeMultiplier={textSizeMultiplier}
        x={0}
      />
      <g transform="translate(136.672 0)">
        <rect x="0" y="0" width="10" height="6.25" fill={primary} />
        <rect x="10" y="0" width="15" height="6.25" fill={secondary} />

        <rect x="0" y="9.375" width="15" height="6.25" fill={primary} />
        <rect x="15" y="9.375" width="10" height="6.25" fill={secondary} />

        <rect x="0" y="18.75" width="20" height="6.25" fill={primary} />
        <rect x="20" y="18.75" width="5" height="6.25" fill={secondary} />
      </g>
    </>
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 161.672 25"
      width={width}
      height={height}
      role="img"
      aria-label="Datalayer"
      ref={ref}
      {...svgProps}
    >
      {inverse ? logoFirst : textFirst}
    </svg>
  );
});

export default DatalayerLogoText;
