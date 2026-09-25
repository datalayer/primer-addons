/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Sun Color System – Warm, radiant golden light.
 *
 * Anchored on the vivid amber base #FFC107 (R:255 G:193 B:7): energetic,
 * optimistic, and welcoming, paired with a deep amber-brown for
 * accessible text. Sunlit and luminous. WCAG AA/AAA for text & buttons.
 */
export const sunColors = {
  // Core Neutrals — warm, sunlit
  black: '#1F1904', // Deep amber-brown — primary dark background
  gray: '#7A6A3A',  // Warm amber-taupe — secondary text
  white: '#FFF9EC', // Sunlit off-white — primary light background

  // Sun palette (Brand) — anchored on the base #FFC107
  sunBase: '#FFC107',   // Base color — radiant amber
  sunBrand: '#FFC107',  // Brand / swatch — radiant amber
  sunAccent: '#F0A800', // Deep amber — charts, highlights on dark surfaces
  sunText: '#8A5300',   // Deep amber-brown — accessible buttons & text on cream (AA+)
  sunTint: '#FFF1C6',   // Pale sun — soft background for callouts
  sunBright: '#FFD54A', // Bright sun — highlights on dark backgrounds
  sunHover: '#6E4200',  // Dark amber — primary button hover

  // Semantic roles — kept warm & radiant
  attentionBrand: '#9A7B00',
  attentionAccent: '#E0B400',
  attentionTint: '#FFF0BE',
  dangerBrand: '#B23A1E',
  dangerAccent: '#DE5A38',
  dangerTint: '#FADFD5',
  severeBrand: '#A85D0C',
  severeAccent: '#E08421',
  severeTint: '#FCE6CC',
  doneBrand: '#6A4E9E',
  doneAccent: '#8B72B8',
  doneTint: '#EAE3F5',

  // Bright / vivid colours for SVG illustrations (radiant, luminous)
  brightGlow: '#FFC107',  // Amber glow — primary glow (the base)
  brightPop: '#FF9F1C',   // Vivid orange-amber — contrasting accent
  brightSpark: '#FFD54A', // Bright sun — sparkle / tertiary
  brightBlaze: '#FF6B35', // Warm coral-orange — warm accent
  brightSurge: '#4FB0C6', // Sky blue — cool accent (radiant sky)

  // Warm vivid colours — amber & gold accents
  brightFlame: '#FF8500', // Amber flame — warm energy
  brightGold: '#FFD700',  // Gold — highlight

  // Vivid brights for light backgrounds — deeper for contrast on cream
  brightLightGlow: '#8A5300',  // Deep amber-brown
  brightLightPop: '#B8560F',   // Deep orange-amber
  brightLightSpark: '#9A7B00', // Deep gold
  brightLightBlaze: '#B23A1E', // Deep coral
  brightLightSurge: '#2A7C8E', // Deep sky-teal
  brightLightFlame: '#A85D0C', // Deep amber
  brightLightGold: '#8A6E00',  // Deep gold
};
