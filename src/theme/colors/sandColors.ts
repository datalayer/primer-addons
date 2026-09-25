/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Sand Color System – Warm golden desert neutrals.
 *
 * Anchored on the golden-wheat base #E2CA76: sun-bleached dunes paired
 * with deep ochre for accessible text. A calm, editorial, earthy feel
 * with an Anthropic-like book warmth. WCAG AA/AAA for text & buttons.
 */
export const sandColors = {
  // Core Neutrals — warm, earthy
  black: '#201B0E', // Warm dark olive-brown — primary dark background
  gray: '#6E6142',  // Khaki taupe — secondary text
  white: '#F7F1DF', // Wheat cream — primary light background

  // Sand / Wheat palette (Brand) — anchored on the base #E2CA76
  sandBase: '#E2CA76',   // Base color — golden wheat sand
  sandBrand: '#E2CA76',  // Brand / swatch — golden wheat
  sandAccent: '#D4B85E', // Mid wheat — charts, highlights on dark surfaces
  sandText: '#7A5E12',   // Deep ochre — accessible buttons & text on cream (AA+)
  sandTint: '#F2E7C2',   // Pale wheat — soft background for callouts
  sandBright: '#ECD98F', // Bright wheat — highlights on dark backgrounds
  sandHover: '#5C4710',  // Dark ochre — primary button hover

  // Semantic roles — kept warm & earthy
  attentionBrand: '#977E13',
  attentionAccent: '#D9B21E',
  attentionTint: '#F5EBC4',
  dangerBrand: '#A8412A',
  dangerAccent: '#D65C3F',
  dangerTint: '#F6DDD3',
  severeBrand: '#A5651A',
  severeAccent: '#D98A2E',
  severeTint: '#F6E5CC',
  doneBrand: '#6A548F',
  doneAccent: '#8A6FB0',
  doneTint: '#E9E2F2',

  // Bright / vivid colours for SVG illustrations (warm, luminous)
  brightGlow: '#E2CA76',  // Golden sand glow — primary glow (the base)
  brightPop: '#D9A85A',   // Amber clay — contrasting accent
  brightSpark: '#ECD98F', // Bright wheat — sparkle / tertiary
  brightBlaze: '#E0703F', // Terracotta — warm accent
  brightSurge: '#93A97F', // Olive-sage — cool accent (desert scrub)

  // Warm vivid colours — amber & gold accents
  brightFlame: '#E69430', // Amber — warm energy
  brightGold: '#F0D45E',  // Golden — highlight

  // Vivid brights for light backgrounds — deeper for contrast on cream
  brightLightGlow: '#7A5E12',  // Deep ochre
  brightLightPop: '#A5661E',   // Deep amber
  brightLightSpark: '#977E13', // Deep wheat gold
  brightLightBlaze: '#B0432A', // Deep terracotta
  brightLightSurge: '#5E7050', // Deep olive
  brightLightFlame: '#A5651A', // Deep amber
  brightLightGold: '#8A6E10',  // Deep gold
};
