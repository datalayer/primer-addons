/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Ivory Color System – Soft, warm off-white neutrals.
 *
 * Anchored on the light-ivory base #E6D2B5 (R:230 G:210 B:181): a calm,
 * refined, and welcoming palette paired with a deep warm taupe for
 * accessible text. Gentle and editorial, with a hospitable, paper-like
 * warmth. WCAG AA/AAA for text & buttons.
 */
export const ivoryColors = {
  // Core Neutrals — warm, soft
  black: '#211C15', // Warm espresso — primary dark background
  gray: '#6F6353',  // Warm taupe — secondary text
  white: '#FBF6EC', // Soft ivory — primary light background

  // Ivory palette (Brand) — anchored on the base #E6D2B5
  ivoryBase: '#E6D2B5',   // Base color — light ivory
  ivoryBrand: '#E6D2B5',  // Brand / swatch — light ivory
  ivoryAccent: '#D8C09B', // Deeper ivory — charts, highlights on dark surfaces
  ivoryText: '#6B5A3E',   // Deep warm taupe — accessible buttons & text on ivory (AA+)
  ivoryTint: '#F3E9D6',   // Pale ivory — soft background for callouts
  ivoryBright: '#EFDFC2', // Bright ivory — highlights on dark backgrounds
  ivoryHover: '#52442D',  // Dark taupe — primary button hover

  // Semantic roles — kept warm & refined
  attentionBrand: '#8A7320',
  attentionAccent: '#CBAA35',
  attentionTint: '#F4ECCD',
  dangerBrand: '#A34632',
  dangerAccent: '#CE6047',
  dangerTint: '#F5DFD8',
  severeBrand: '#9C6221',
  severeAccent: '#CE8637',
  severeTint: '#F4E6D2',
  doneBrand: '#6A5591',
  doneAccent: '#8B72B2',
  doneTint: '#EAE3F3',

  // Bright / vivid colours for SVG illustrations (warm, luminous)
  brightGlow: '#E6D2B5',  // Ivory glow — primary glow (the base)
  brightPop: '#D8B27E',   // Warm tan — contrasting accent
  brightSpark: '#EFDFC2', // Bright ivory — sparkle / tertiary
  brightBlaze: '#DD7048', // Soft terracotta — warm accent
  brightSurge: '#98A783', // Sage — cool accent

  // Warm vivid colours — amber & gold accents
  brightFlame: '#E0912F', // Amber — warm energy
  brightGold: '#EACF6A',  // Soft gold — highlight

  // Vivid brights for light backgrounds — deeper for contrast on ivory
  brightLightGlow: '#6B5A3E',  // Deep taupe
  brightLightPop: '#9C6626',   // Deep amber-tan
  brightLightSpark: '#8A7320', // Deep gold
  brightLightBlaze: '#AB4229', // Deep terracotta
  brightLightSurge: '#5C6C4C', // Deep sage
  brightLightFlame: '#9C6221', // Deep amber
  brightLightGold: '#836A18',  // Deep gold
};
