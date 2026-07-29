/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import type { ReactElement } from 'react';
import { Tooltip } from '@primer/react';
import { Box } from '../box/Box';
import { themeConfigs, themeVariants, type ThemeVariant } from '../../theme';

export interface ThemeCircleProps {
  /** Current theme variant. */
  themeVariant: ThemeVariant;
  /** Called with the next theme variant when the circle is clicked. */
  onThemeChange: (theme: ThemeVariant) => void;
  /**
   * Ordered list of themes to cycle through. Defaults to every registered
   * theme variant.
   */
  themes?: ThemeVariant[];
  /** Diameter of the circle in pixels. */
  size?: number;
}

/**
 * A single clickable circle, filled with the current theme's brand color,
 * that cycles to the next theme in `themes` on each click.
 */
export function ThemeCircle({
  themeVariant,
  onThemeChange,
  themes,
  size = 28,
}: ThemeCircleProps): ReactElement {
  const list = themes && themes.length > 0 ? themes : themeVariants;
  const currentIndex = Math.max(0, list.indexOf(themeVariant));
  const cfg = themeConfigs[themeVariant] ?? themeConfigs[list[0]];
  const next = list[(currentIndex + 1) % list.length];
  const nextCfg = themeConfigs[next];
  const innerDotSize = Math.max(8, Math.round(size * 0.58));

  return (
    <Tooltip text={`Theme: ${cfg.label} — click for ${nextCfg.label}`} direction="s">
      <Box
        as="button"
        type="button"
        aria-label={`Theme: ${cfg.label}. Switch to ${nextCfg.label}.`}
        onClick={() => onThemeChange(next)}
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          boxSizing: 'border-box',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'canvas.default',
          appearance: 'none',
          WebkitAppearance: 'none',
          border: '2px solid',
          borderColor: 'border.default',
          cursor: 'pointer',
          padding: 0,
          transition: 'border-color 0.15s ease, transform 0.15s ease',
          '&:hover': { borderColor: 'accent.fg', transform: 'scale(1.05)' },
          '&:active': { transform: 'scale(1.02)' },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'accent.fg',
            outlineOffset: 1,
          },
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: innerDotSize,
            height: innerDotSize,
            borderRadius: '50%',
            backgroundColor: cfg.brandColor,
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default ThemeCircle;
