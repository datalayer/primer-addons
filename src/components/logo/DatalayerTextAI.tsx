/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { type ThemeVariant } from '../../theme';
import { AI } from './AI';
import { DatalayerText } from './DatalayerText';
import { getLogoColors } from './DatalayerLogo';

export interface DatalayerTextAIProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  scale?: number;
  colorMode?: 'light' | 'dark' | 'auto';
  variant?: ThemeVariant;
  /** Colour for the "LAYER" part of the wordmark. */
  primaryColor?: string;
  /** Secondary accent colour used by the AI glyph. */
  secondaryColor?: string;
  /** Colour for the "DATA" part of the wordmark. */
  textColor?: string;
  textSizeMultiplier?: number;
  aiPrimaryColor?: string;
  aiSecondaryColor?: string;
  /** Gap between wordmark and AI glyph in viewBox units. */
  aiGap?: number;
}

const TEXT_LEFT_TRIM = 12;
const TEXT_END_X = 136.672 - TEXT_LEFT_TRIM;
const AI_SIZE = 24;
const AI_VISIBLE_TOP = 3.932;
const AI_VISIBLE_LEFT = 0.25;
const AI_VISIBLE_HEIGHT = 16.136075;
const AI_SCALE_TO_TEXT_HEIGHT = 25 / AI_VISIBLE_HEIGHT;
const AI_RENDER_SIZE = AI_SIZE * AI_SCALE_TO_TEXT_HEIGHT;
const AI_X_TRIM = AI_VISIBLE_LEFT * AI_SCALE_TO_TEXT_HEIGHT;
const AI_Y_TRIM = AI_VISIBLE_TOP * AI_SCALE_TO_TEXT_HEIGHT;

/**
 * Datalayer wordmark followed by AI glyph on one line.
 * Both elements are aligned to the same 25-unit cap height.
 */
export const DatalayerTextAI = forwardRef<SVGSVGElement, DatalayerTextAIProps>(
  function DatalayerTextAI(
    {
      size = 25,
      scale = 1,
      colorMode = 'light',
      variant = 'datalayer',
      primaryColor,
      secondaryColor,
      textColor,
      // 2.380655 ~= 25 / (0.7 * 15.00187)
      textSizeMultiplier = 2.380655,
      aiPrimaryColor,
      aiSecondaryColor,
      aiGap = 6,
      ...svgProps
    },
    ref,
  ) {
    const themed = getLogoColors(variant, colorMode);
    const layerColor = primaryColor ?? themed.primary;
    const accentColor = secondaryColor ?? themed.secondary;
    const dataTextColor = textColor ?? themed.textColor;
    const resolvedAiPrimary = aiPrimaryColor ?? layerColor;
    const resolvedAiSecondary = aiSecondaryColor ?? accentColor;

    const viewBoxWidth = TEXT_END_X + aiGap + AI_RENDER_SIZE - AI_X_TRIM;
    const baseHeight = size;
    const baseWidth = (viewBoxWidth / 25) * size;
    const height = baseHeight * scale;
    const width = baseWidth * scale;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBoxWidth} 25`}
        width={width}
        height={height}
        role="img"
        aria-label="Datalayer AI"
        ref={ref}
        {...svgProps}
      >
        <DatalayerText
          primaryColor={layerColor}
          secondaryColor={dataTextColor}
          sizeMultiplier={textSizeMultiplier}
          x={-TEXT_LEFT_TRIM}
        />
        <AI
          size={AI_RENDER_SIZE}
          x={TEXT_END_X + aiGap - AI_X_TRIM}
          y={-AI_Y_TRIM}
          variant={variant}
          colorMode={colorMode}
          primaryColor={resolvedAiPrimary}
          secondaryColor={resolvedAiSecondary}
        />
      </svg>
    );
  },
);

export default DatalayerTextAI;