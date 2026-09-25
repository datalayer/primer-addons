/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { DatalayerLogo, getLogoColors } from './DatalayerLogo';
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
  /** Explicit gradient [start, end] for primary (left) bars. */
  primaryGradient?: [start: string, end: string];
  /** Explicit gradient [start, end] for secondary (right) bars. */
  secondaryGradient?: [start: string, end: string];
  /** Enable horizontal gradients matching the original brand logo. Default `true`. */
  gradient?: boolean;
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
    primaryGradient,
    secondaryGradient,
    gradient = true,
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

  // The text-first arrangement has an intrinsic leading gutter from the
  // original outline coordinates. Trim it at the source geometry level.
  const textFirstLeftTrim = 12;
  const viewBoxWidth = inverse ? 161.672 : 161.672 - textFirstLeftTrim;

  const baseHeight = size;
  const baseWidth = (viewBoxWidth / 25) * size;
  const height = baseHeight * scale;
  const width = baseWidth * scale;

  const logoFirst = (
    <>
      <DatalayerLogo
        size={25}
        x={0}
        y={0}
        variant={variant}
        colorMode={colorMode}
        primaryColor={primary}
        secondaryColor={secondary}
        primaryGradient={primaryGradient}
        secondaryGradient={secondaryGradient}
        gradient={gradient}
      />
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
        x={-textFirstLeftTrim}
      />
      <DatalayerLogo
        size={25}
        x={136.672 - textFirstLeftTrim}
        y={0}
        variant={variant}
        colorMode={colorMode}
        primaryColor={primary}
        secondaryColor={secondary}
        primaryGradient={primaryGradient}
        secondaryGradient={secondaryGradient}
        gradient={gradient}
      />
    </>
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} 25`}
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
