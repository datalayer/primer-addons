/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * Loop Color System – one accent, neutral everything else.
 *
 * The look of an application built in LOOP: a white (or near-black)
 * canvas, near-black (or near-white) text, hairlines instead of borders,
 * and a single soft accent that dark text sits on. Nothing else carries
 * colour, apart from the three colours of a verdict.
 *
 * The accent of the theme itself is mint — a soft green, lighter than
 * the platform's (decided 2026-10-03, after a day on sky). An
 * application may take one of five others: the accents are the theme
 * system's, over every theme (`themeAccents`, decided 2026-10-07).
 */
export const loopColors = {
  // Core neutrals
  black: '#131314', // Near-black — primary dark background
  gray: '#6E6E73',  // Secondary text on light: a soft grey, 5.1 to 1 on white
  white: '#FFFFFF', // White — primary light background

  // Neutral surfaces and ink. The ink is not black: a deep grey with a
  // breath of blue, as a page of a well-set book reads — 16.8 to 1 on white.
  ink: '#1D1D1F',        // Text on light
  inkDark: '#F5F5F7',    // Text on dark
  subtle: '#F5F5F7',     // Subtle surface on light (a bubble, a chip)
  subtleDark: '#1E1E20', // Subtle surface on dark
  grayDark: '#A1A1A6',   // Secondary text on dark

  // Loop palette (Brand) — mint
  loopBrand: '#7ADBB8',  // The accent — a bubble, a send button, a swatch
  loopOn: '#06281E',     // Text that sits on the accent (9.5 to 1)
  loopAccent: '#4FC79C', // Deeper accent — charts, highlights
  loopBrandHover: '#6CCFAA', // The filled button, hovered: dark text 8.4 to 1
  loopText: '#248462',   // Accent text & links on white: the lightest mint that reads, 4.6 to 1
  loopRing: '#0F6B4F',   // The focus ring: 3 to 1 or more around every pastel
  loopTint: '#F0FAF6',   // Quiet tint — a draft, a callout
  loopStage: '#DDF5EC',  // The stage behind an application
  loopBright: '#8FE5C6', // Accent text & links on dark
  loopHover: '#227C5C',  // Accent text hover

  // The stage and the quiet tint, on dark
  loopStageDark: '#10261F',
  loopTintDark: '#17211D',

  // Semantic roles — kept for verdicts and rules only
  successBrand: '#1F8A5B',
  successAccent: '#58C797',
  successTint: '#E4F5EC',
  attentionBrand: '#A66A12',
  attentionAccent: '#E0A54A',
  attentionTint: '#FBF0DC',
  dangerBrand: '#BF3F38',
  dangerAccent: '#F08A83',
  dangerTint: '#FBE7E5',
  severeBrand: '#B4571A',
  severeAccent: '#E8935A',
  severeTint: '#FBEADD',
  doneBrand: '#6B53C9',
  doneAccent: '#C0AEF6',
  doneTint: '#F6F3FE',

  // Bright colours for SVG illustrations — the six accents themselves
  brightGlow: '#7ADBB8',  // Mint — the accent
  brightPop: '#8CCBF9',   // Sky
  brightSpark: '#BEDC55', // Lime
  brightBlaze: '#F6A5C1', // Rose
  brightSurge: '#C0AEF6', // Violet
  brightFlame: '#F4A261', // Soft orange
  brightGold: '#F8D469',  // Sun

  // The same, deeper, for light backgrounds
  brightLightGlow: '#0F6B4F',  // Deep green
  brightLightPop: '#1F6FB0',   // Deep sky
  brightLightSpark: '#5F7A00', // Deep lime
  brightLightBlaze: '#B83A6B', // Deep rose
  brightLightSurge: '#6B53C9', // Deep violet
  brightLightFlame: '#B4571A', // Deep orange
  brightLightGold: '#8A6A00',  // Deep sun
};
