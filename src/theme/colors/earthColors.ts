/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Earth Color System – The Blue Planet
 * Ocean blues (sea), forest greens (plants), golden yellows (sun)
 * WCAG AA/AAA compliant
 */
export const earthColors = {
  // Core Neutrals
  black: '#0A1628',   // Deep ocean night — primary dark background
  gray: '#5B6B7A',    // Slate — secondary text
  white: '#F7FAFC',   // Morning sky — primary light background

  // Ocean Blue palette (Brand) — the blue planet
  oceanBrand: '#0369A1',   // Deep ocean — headings, icons, dividers
  oceanAccent: '#0EA5E9',  // Bright sky blue — charts, highlights on dark surfaces
  oceanText: '#075985',    // Accessible ocean blue for text & buttons (AA+ on white)
  oceanTint: '#E0F2FE',    // Pale sky — soft background for callouts
  oceanBright: '#38BDF8',  // Vivid sky blue — highlights on dark backgrounds
  oceanHover: '#0C4A6E',   // Abyss navy — primary button hover

  // Forest / Canopy (Secondary — green like plants)
  forestBrand: '#15803D',  // Dense canopy green
  forestAccent: '#22C55E', // Sunlit leaf green
  forestTint: '#DCFCE7',   // Morning dew

  // Sun / Warmth (Tertiary — yellow like sun)
  sunBrand: '#CA8A04',     // Deep golden sun
  sunAccent: '#EAB308',    // Vivid sunflower
  sunTint: '#FEF9C3',      // Pale sunshine

  // Earth / Soil tones
  earthWarm: '#92400E',    // Red earth / laterite
  earthSand: '#D97706',    // Sandstone / amber
  earthClay: '#B45309',    // Terracotta

  // Bright / vivid colours for SVG illustrations
  brightGlow: '#0EA5E9',   // Vivid ocean blue — primary glow (sea)
  brightPop: '#22C55E',    // Vivid green — contrasting accent (vegetation)
  brightSpark: '#EAB308',  // Vivid gold — sparkle (sunlight)
  brightBlaze: '#EF4444',  // Vivid red — warm accent (wildfire / alerts)
  brightSurge: '#3B82F6',  // Deep blue — cool accent (deep water)

  // Warm vivid colours — earth & sun accents
  brightFlame: '#F59E0B',  // Amber gold — warm energy (solar)
  brightGold: '#FACC15',   // Bright sunflower — golden highlight

  // Vivid brights for light backgrounds
  brightLightGlow: '#0284C7',  // Deep ocean blue
  brightLightPop: '#16A34A',   // Vivid forest green
  brightLightSpark: '#CA8A04', // Deep golden sun
  brightLightBlaze: '#DC2626', // Deep red
  brightLightSurge: '#2563EB', // Deep ocean blue
  brightLightFlame: '#D97706', // Deep amber
  brightLightGold: '#A16207',  // Deep gold
};
