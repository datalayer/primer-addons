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
 * Vivid colour triplet for SVG illustrations.
 *
 * Inspired by OpenAI's blog — ultra-saturated, luminous hues designed
 * to glow and pop against both light and dark backgrounds.
 */
export interface BrightPalette {
  /** Primary vivid accent — the "star" glow colour. */
  glow: string;
  /** Contrasting vivid colour — analogous/complement. */
  pop: string;
  /** Third vivid colour — sparkle / small highlights. */
  spark: string;
  /** Vivid red / warm accent — energy, urgency, warmth. */
  blaze: string;
  /** Vivid blue / cool accent — depth, trust, electricity. */
  surge: string;
  /** Vivid orange — warm energy, fire, dynamism. */
  flame: string;
  /** Vivid yellow / gold — highlights, attention, optimism. */
  gold: string;
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
  /**
   * Vivid colour triplet for SVG illustrations — ultra-saturated,
   * luminous hues that glow and pop on dark backgrounds (OpenAI-blog style).
   */
  brightPalette: BrightPalette;
  /**
   * Deeper / richer bright palette for light backgrounds.
   * Same hue families as `brightPalette` but with higher contrast on
   * light surfaces so illustrations don't appear faded.
   */
  brightPaletteLight: BrightPalette;
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
    brightPalette: {
      glow: datalayerColors.brightGlow,     // #00D68F — vivid emerald
      pop: datalayerColors.brightPop,       // #00E5FF — electric cyan
      spark: datalayerColors.brightSpark,   // #76FF03 — lime neon
      blaze: datalayerColors.brightBlaze,   // #FF1744 — vivid red
      surge: datalayerColors.brightSurge,   // #2979FF — electric blue
      flame: datalayerColors.brightFlame,   // #FF6D00 — vivid orange
      gold: datalayerColors.brightGold,     // #FFD600 — vivid yellow
    },
    brightPaletteLight: {
      glow: datalayerColors.brightLightGlow,     // #00BFA5 — vivid aqua-green
      pop: datalayerColors.brightLightPop,       // #00B0FF — vivid sky blue
      spark: datalayerColors.brightLightSpark,   // #64DD17 — vivid chartreuse
      blaze: datalayerColors.brightLightBlaze,   // #FF1744 — vivid red
      surge: datalayerColors.brightLightSurge,   // #2979FF — electric blue
      flame: datalayerColors.brightLightFlame,   // #FF6D00 — vivid orange
      gold: datalayerColors.brightLightGold,     // #FFAB00 — vivid amber
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
    brightPalette: {
      glow: spatialColors.brightGlow,      // #7C4DFF — electric violet
      pop: spatialColors.brightPop,        // #448AFF — neon blue
      spark: spatialColors.brightSpark,    // #E040FB — vivid magenta
      blaze: spatialColors.brightBlaze,    // #FF5252 — neon red
      surge: spatialColors.brightSurge,    // #00B0FF — deep sky blue
      flame: spatialColors.brightFlame,    // #FF9100 — amber orange
      gold: spatialColors.brightGold,      // #FFEA00 — electric yellow
    },
    brightPaletteLight: {
      glow: spatialColors.brightLightGlow,      // #7C4DFF — electric violet
      pop: spatialColors.brightLightPop,        // #448AFF — neon blue
      spark: spatialColors.brightLightSpark,    // #D500F9 — vivid purple
      blaze: spatialColors.brightLightBlaze,    // #FF5252 — neon red
      surge: spatialColors.brightLightSurge,    // #00B0FF — vivid sky blue
      flame: spatialColors.brightLightFlame,    // #FF9100 — vivid amber orange
      gold: spatialColors.brightLightGold,      // #FFC400 — vivid gold
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
    brightPalette: {
      glow: lovelyColors.brightGlow,       // #FF4081 — hot pink
      pop: lovelyColors.brightPop,         // #FF6E40 — vivid coral
      spark: lovelyColors.brightSpark,     // #EA80FC — electric fuchsia
      blaze: lovelyColors.brightBlaze,     // #FF1744 — vivid crimson
      surge: lovelyColors.brightSurge,     // #536DFE — indigo blue
      flame: lovelyColors.brightFlame,     // #FF6E40 — coral orange
      gold: lovelyColors.brightGold,       // #FFD740 — amber gold
    },
    brightPaletteLight: {
      glow: lovelyColors.brightLightGlow,       // #FF4081 — hot pink
      pop: lovelyColors.brightLightPop,         // #FF6E40 — vivid coral
      spark: lovelyColors.brightLightSpark,     // #EA80FC — electric fuchsia
      blaze: lovelyColors.brightLightBlaze,     // #FF1744 — vivid crimson
      surge: lovelyColors.brightLightSurge,     // #536DFE — vivid indigo
      flame: lovelyColors.brightLightFlame,     // #FF6E40 — vivid coral orange
      gold: lovelyColors.brightLightGold,       // #FFD740 — vivid amber gold
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
    brightPalette: {
      glow: matrixColors.brightGlow,       // #39FF14 — neon green
      pop: matrixColors.brightPop,         // #00FF88 — phosphor cyan
      spark: matrixColors.brightSpark,     // #CCFF00 — acid lime
      blaze: matrixColors.brightBlaze,     // #FF0040 — matrix red pill
      surge: matrixColors.brightSurge,     // #00E5FF — electric blue
      flame: matrixColors.brightFlame,     // #FF6D00 — electric orange
      gold: matrixColors.brightGold,       // #FFEA00 — glitch yellow
    },
    brightPaletteLight: {
      glow: matrixColors.brightLightGlow,       // #00E676 — vivid green
      pop: matrixColors.brightLightPop,         // #1DE9B6 — vivid teal-mint
      spark: matrixColors.brightLightSpark,     // #AEEA00 — vivid lime
      blaze: matrixColors.brightLightBlaze,     // #FF1744 — vivid red
      surge: matrixColors.brightLightSurge,     // #00B0FF — vivid sky blue
      flame: matrixColors.brightLightFlame,     // #FF6D00 — vivid orange
      gold: matrixColors.brightLightGold,       // #FFAB00 — vivid amber
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

/**
 * Get the bright (vivid / OpenAI-blog-style) palette for a given theme variant.
 *
 * When `colorMode` is `'light'` the vivid / saturated light-background palette
 * is returned — these are punchy, high-saturation colours designed to keep SVG
 * illustrations vibrant and energetic on near-white surfaces.
 * Defaults to the dark-optimised neon palette for backward compatibility.
 */
export function getBrightPalette(
  variant: ThemeVariant = 'datalayer',
  colorMode?: 'light' | 'dark' | 'auto',
): BrightPalette {
  const cfg = themeConfigs[variant] ?? themeConfigs.datalayer;
  if (colorMode === 'light') {
    return cfg.brightPaletteLight ?? cfg.brightPalette;
  }
  return cfg.brightPalette;
}
