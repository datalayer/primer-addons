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

/** A pair of colours for a two-stop gradient. */
export interface GradientPair {
  /** Start colour (brighter / brand). */
  from: string;
  /** End colour (deeper / hover). */
  to: string;
}

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
  /**
   * Per-mode gradient pair for card backgrounds, banners, and other
   * decorative surfaces that need a themed two-colour gradient.
   */
  cardGradient: {
    light: GradientPair;
    dark: GradientPair;
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
    cardGradient: {
      light: { from: datalayerColors.greenBrand,  to: datalayerColors.greenText },    // #16A085 → #117A65
      dark:  { from: datalayerColors.greenAccent, to: datalayerColors.greenBrand },   // #1ABC9C → #16A085
    },
  },
  spatial: {
    label: 'Spatial',
    description: 'Cosmic indigo & deep blues — inspired by space.',
    brandColor: spatialColors.indigoBrand,
    defaultColorMode: 'auto',
    primerTheme: spatialTheme,
    themeStyles: spatialThemeStyles,
    cardGradient: {
      light: { from: spatialColors.indigoBrand,   to: spatialColors.indigoText },     // #4F46E5 → #3730A3
      dark:  { from: spatialColors.indigoAccent,  to: spatialColors.indigoBrand },    // #6366F1 → #4F46E5
    },
  },
  lovely: {
    label: 'Lovely',
    description: 'Warm rose & magenta — soft and inviting.',
    brandColor: lovelyColors.roseBrand,
    defaultColorMode: 'auto',
    primerTheme: lovelyTheme,
    themeStyles: lovelyThemeStyles,
    cardGradient: {
      light: { from: lovelyColors.roseBrand,      to: lovelyColors.roseText },        // #DB2777 → #9D174D
      dark:  { from: lovelyColors.roseAccent,     to: lovelyColors.roseBrand },       // #EC4899 → #DB2777
    },
  },
  matrix: {
    label: 'Matrix',
    description: 'Phosphor green on black — CRT terminal aesthetic.',
    brandColor: matrixColors.greenPhosphor,
    defaultColorMode: 'dark',
    primerTheme: matrixTheme,
    themeStyles: matrixThemeStyles,
    cardGradient: {
      light: { from: matrixColors.greenBrand,     to: matrixColors.greenText },       // #16A085 → #117A65
      dark:  { from: matrixColors.greenGlow,      to: matrixColors.greenHover },      // #39FF14 → #0E6655
    },
  },
};

/** All available theme variants in display order. */
export const themeVariants: ThemeVariant[] = ['datalayer', 'spatial', 'lovely', 'matrix'];

/** Look up a theme config by variant name. */
export function getThemeConfig(variant: ThemeVariant): ThemeConfig {
  return themeConfigs[variant];
}

/**
 * Resolve the card gradient for a given theme variant and colour mode.
 * Falls back to `datalayer` / `light` when values are missing.
 */
export function getCardGradient(
  variant: ThemeVariant = 'datalayer',
  colorMode: 'light' | 'dark' | 'auto' = 'light',
): GradientPair {
  const mode = colorMode === 'auto' ? 'light' : colorMode;
  return themeConfigs[variant]?.cardGradient?.[mode] ?? themeConfigs.datalayer.cardGradient.light;
}
