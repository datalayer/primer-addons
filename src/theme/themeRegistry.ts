/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { type CSSProperties } from 'react';
import { type ColorMode } from './DatalayerBrandThemeProvider';

import { datalayerTheme, datalayerThemeStyles } from './themes/datalayerTheme';
import { spatialTheme, spatialThemeStyles } from './themes/spatialTheme';
import { lovelyTheme, lovelyThemeStyles } from './themes/lovelyTheme';
import { matrixTheme, matrixThemeStyles } from './themes/matrixTheme';
import { datalayerColors } from './colors/datalayerColors';
import { spatialColors } from './colors/spatialColors';
import { lovelyColors } from './colors/lovelyColors';
import { matrixColors } from './colors/matrixColors';

/* ─── Types ───────────────────────────────────────────────────────────── */

/** Available theme variants. */
export type ThemeVariant = 'datalayer' | 'spatial' | 'lovely' | 'matrix';

/**
 * Complete configuration for a theme, including the Primer theme object,
 * display metadata, and CSS custom property overrides per color mode.
 */
export interface ThemeConfig {
  /** Human-readable name for UI display. */
  label: string;
  /** Short description of the theme. */
  description: string;
  /** Brand color for the theme — used for colored swatch buttons. */
  brandColor: string;
  /** Recommended default color mode for this theme. */
  defaultColorMode: ColorMode;
  /** Primer theme object passed to `<ThemeProvider theme={…}>`. */
  primerTheme: Record<string, any>;
  /** Per-mode CSS-property overrides for `<DatalayerThemeProvider themeStyles={…}>`. */
  themeStyles: {
    light: CSSProperties;
    dark: CSSProperties;
  };
}

/* ─── Registry ────────────────────────────────────────────────────────── */

export const themeConfigs: Record<ThemeVariant, ThemeConfig> = {
  datalayer: {
    label: 'Datalayer',
    description: 'Default green palette — the classic Datalayer look.',
    brandColor: datalayerColors.greenBrand,
    defaultColorMode: 'auto',
    primerTheme: datalayerTheme,
    themeStyles: datalayerThemeStyles,
  },
  spatial: {
    label: 'Spatial',
    description: 'Cosmic indigo & deep blues — inspired by space.',
    brandColor: spatialColors.indigoBrand,
    defaultColorMode: 'auto',
    primerTheme: spatialTheme,
    themeStyles: spatialThemeStyles,
  },
  lovely: {
    label: 'Lovely',
    description: 'Warm rose & magenta — soft and inviting.',
    brandColor: lovelyColors.roseBrand,
    defaultColorMode: 'auto',
    primerTheme: lovelyTheme,
    themeStyles: lovelyThemeStyles,
  },
  matrix: {
    label: 'Matrix',
    description: 'Phosphor green on black — CRT terminal aesthetic.',
    brandColor: matrixColors.greenPhosphor,
    defaultColorMode: 'dark',
    primerTheme: matrixTheme,
    themeStyles: matrixThemeStyles,
  },
};

/** All available theme variants in display order. */
export const themeVariants: ThemeVariant[] = ['datalayer', 'spatial', 'lovely', 'matrix'];

/** Look up a theme config by variant name. */
export function getThemeConfig(variant: ThemeVariant): ThemeConfig {
  return themeConfigs[variant];
}
