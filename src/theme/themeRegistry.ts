/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The theme registry for Primer React: every theme's tokens (`themeTokens`)
 * with its Primer theme object, and the helpers that read the OS colour
 * scheme. The public API is unchanged; the data behind it lives in
 * `themeTokens` so it can be read without Primer React.
 */

import { datalayerTheme } from './themes/datalayerTheme';
import { spatialTheme } from './themes/spatialTheme';
import { lovelyTheme } from './themes/lovelyTheme';
import { matrixTheme } from './themes/matrixTheme';
import { earthTheme } from './themes/earthTheme';
import { sandTheme } from './themes/sandTheme';
import { ivoryTheme } from './themes/ivoryTheme';
import { sunTheme } from './themes/sunTheme';
import { loopTheme } from './themes/loopTheme';
import {
  type BrightPalette,
  type ThemeTokens,
  type ThemeVariant,
  avatarColorsOf,
  brightPaletteOf,
  themeTokens,
} from './themeTokens';

export {
  type BrightPalette,
  type GradientPair,
  type ThemeTokens,
  type ThemeVariant,
  avatarColorsOf,
  brightPaletteOf,
  getCardGradient,
  getThemeTokens,
  themeTokens,
  themeVariants,
} from './themeTokens';

/**
 * Complete configuration for a theme, including the Primer theme object,
 * display metadata, and CSS custom property overrides per color mode.
 */
export interface ThemeConfig extends ThemeTokens {
  /** Primer theme object passed to `<ThemeProvider theme={…}>`. */
  primerTheme: Record<string, any>;
}

const primerThemes: Record<ThemeVariant, Record<string, any>> = {
  datalayer: datalayerTheme,
  spatial: spatialTheme,
  lovely: lovelyTheme,
  matrix: matrixTheme,
  earth: earthTheme,
  sand: sandTheme,
  ivory: ivoryTheme,
  sun: sunTheme,
  loop: loopTheme,
};

export const themeConfigs: Record<ThemeVariant, ThemeConfig> = Object.fromEntries(
  (Object.keys(themeTokens) as ThemeVariant[]).map(variant => [
    variant,
    { ...themeTokens[variant], primerTheme: primerThemes[variant] },
  ]),
) as Record<ThemeVariant, ThemeConfig>;

/** Look up a theme config by variant name. */
export function getThemeConfig(variant: ThemeVariant): ThemeConfig {
  return themeConfigs[variant];
}

const osMode = (): 'light' | 'dark' =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

/**
 * Get the bright (vivid / OpenAI-blog-style) palette for a given theme variant.
 *
 * When `colorMode` is `'light'` the vivid / saturated light-background palette
 * is returned — these are punchy, high-saturation colours designed to keep SVG
 * illustrations vibrant and energetic on near-white surfaces.
 * When `colorMode` is `'auto'`, the OS preference is queried via
 * `prefers-color-scheme` so palettes always match the effective background.
 * Defaults to the dark-optimised neon palette for backward compatibility.
 */
export function getBrightPalette(
  variant: ThemeVariant = 'datalayer',
  colorMode?: 'light' | 'dark' | 'auto',
): BrightPalette {
  const mode = colorMode === 'auto' ? osMode() : colorMode === 'light' ? 'light' : 'dark';
  return brightPaletteOf(variant, mode);
}

/**
 * Get a 5-colour avatar palette for the given theme variant and colour mode.
 *
 * Designed for use with the `boring-avatars` library's `colors` prop.
 * When `colorMode` is `'auto'`, the OS preference is queried via
 * `prefers-color-scheme` so avatars always match the effective background.
 * Falls back to `datalayer` / `light` when values are missing.
 */
export function getAvatarColors(
  variant: ThemeVariant = 'datalayer',
  colorMode: 'light' | 'dark' | 'auto' = 'light',
): string[] {
  return avatarColorsOf(variant, colorMode === 'auto' ? osMode() : colorMode);
}
